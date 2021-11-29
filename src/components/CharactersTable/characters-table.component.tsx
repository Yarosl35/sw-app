import { useState, useEffect, useRef } from 'react';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { useLazyQuery, QueryLazyOptions } from '@apollo/client';

import Search from './Search/search.component';
import { GET_ALL_PEOPLE } from '../../graphql/queries/people';
import HeartIcon from '../../assets/glyphs/glyph_heart_16.svg';
import HeartIconFilled from '../../assets/glyphs/glyph_heart_fill_16.svg';
import * as styles from './characters-table.styles';

const columns: GridColDef[] = [
  {
    field: 'id',
    sortable: false,
    renderHeader: () => (
      <img src={HeartIconFilled} />
    ),
    renderCell: (params: GridRenderCellParams) => {
      return (
        <styles.HeartIconButton aria-label="favorite">
          <img src={HeartIcon} />
        </styles.HeartIconButton>
      );
    },
  },
  {
    field: 'name',
    headerName: 'Name',
    minWidth: 200,
    sortable: true,
    flex: 1,
  },
  {
    field: 'birthYear',
    headerName: 'Birth Year',
    flex: 1,
    sortable: false,
  },
  {
    field: 'gender',
    headerName: 'Gender',
    flex: 1,
    sortable: false,
  },
  {
    field: 'homeworld',
    headerName: 'Home World',
    sortable: false,
    flex: 1,
    renderCell: (params: GridRenderCellParams) => {
      if (!params.row.homeworld) return;
      return params.row.homeworld.name;
    },
  },
  {
    field: 'species',
    headerName: 'Species',
    sortable: false,
    flex: 1,
    renderCell: (params: GridRenderCellParams) => {
      if (!params.row.species) return;
      return params.row.species.name;
    },
  },
];

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
  const [currentPage, setPage] = useState(0);
  const [entities, setEntities] = useState({ edges: [], totalCount: 0 } as IConnectionProps);
  const cursorsStack = useRef([] as string[]);
  const [getEntities, { loading, error, data, refetch }] = useLazyQuery(GET_ALL_PEOPLE, {
    fetchPolicy: 'no-cache',
    variables: {
      first: DEFAULT_PAGE_SIZE,
    } as IConnectionVariables
  });

  useEffect(() => {
    getEntities();
  }, []);

  useEffect(() => {
    if (!data) {
      return;
    }

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
        columns={columns}
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
