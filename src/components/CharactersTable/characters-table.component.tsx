import { useState, useEffect, useRef } from 'react';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { useLazyQuery } from '@apollo/client';

import Search from './Search/search.component';
import { IColumnsBuilder, buildColumns } from './columns';
import FavoritesService from '../../services/favorites.service';
import { GET_ALL_PEOPLE } from '../../graphql/queries/people';
import * as styles from './characters-table.styles';

const DEFAULT_PAGE_SIZE: number = 10;

interface IConnectionProps {
  edges: any[];
  pageInfo?: any;
  totalCount?: number;
}

interface IConnectionVariables {
  first?: number;
  after?: any;
}

export default function CharactersTable() {
  const cursorsStack = useRef([] as string[]);
  const columns = useRef([] as GridColDef[]);
  const [currentPage, setPage] = useState(0);
  const [entities, setEntities] = useState({ edges: [], totalCount: 0 } as IConnectionProps);
  const [getEntities, { loading, error, data, refetch }] = useLazyQuery(GET_ALL_PEOPLE, {
    fetchPolicy: 'no-cache',
    variables: {
      first: DEFAULT_PAGE_SIZE,
    } as IConnectionVariables
  });

  useEffect(() => {
    // get entities lazily as soon as component was mounted
    getEntities();
  }, []);

  useEffect(() => {
    if (!data) {
      return;
    }

    // build data grid columns with the "Favorite" callback handler
    const columnsBuilderParams: IColumnsBuilder = {
      favorites: FavoritesService.getFavorites(),
      onFavorited: (cellParams: GridRenderCellParams) => {
        FavoritesService.favor(cellParams.row.id);
        columns.current = buildColumns({
          ...columnsBuilderParams,
          favorites: FavoritesService.getFavorites(),
        });
        setEntities({ ...data.allPeople });
      },
    }
    columns.current = buildColumns(columnsBuilderParams);

    setEntities(data.allPeople);
  }, [data]);

  const fetchData = () => {
    let variables = {
      first: DEFAULT_PAGE_SIZE,
      after: cursorsStack.current.length
        ? cursorsStack.current[cursorsStack.current.length - 1]
        : undefined,
    };

    refetch({ ...variables });
  }

  const pageChangeHandler = (page: number) => {
    if (page < currentPage) {
      cursorsStack.current.pop();
    } else {
      cursorsStack.current.push(entities.pageInfo.endCursor);
    }

    fetchData();
    setPage(page);
  }

  const searchHandler = (value: string) => {
    if (!value) {
      setEntities({
        ...entities,
        edges: data.allPeople.edges,
      });
      return;
    }

    const result = entities.edges.filter((edge: any) => edge.node.name.toLowerCase().includes(value));
    setEntities({
      ...entities,
      edges: result,
    });
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const nodes = entities.edges.map((edge: any) => edge.node);
  return (
    <styles.Container>
      <Search onChange={searchHandler} debounce={300} />
      <DataGrid
        autoHeight
        rows={nodes}
        columns={columns.current}
        paginationMode="server"
        pageSize={DEFAULT_PAGE_SIZE}
        onPageChange={pageChangeHandler}
        rowCount={entities.totalCount}
        disableColumnMenu
        disableColumnSelector
        disableSelectionOnClick
      />
    </styles.Container>
  );
}
