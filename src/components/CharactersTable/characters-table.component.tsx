import { useState, useEffect } from 'react';
import { DataGrid, GridColDef, GridValueGetterParams, GridRenderCellParams, GridColumnHeaderParams } from '@mui/x-data-grid';
import { useQuery } from '@apollo/client';

import Search from './Search/search.component';
import IconButton from '@mui/material/IconButton';
import { GET_ALL_PEOPLE } from '../../graphql/queries/people';
import HeartIcon from '../../assets/glyphs/glyph_heart_16.svg';
import HeartIconFilled from '../../assets/glyphs/glyph_heart_fill_16.svg';
import * as styles from './characters-table.styles';

const columns: GridColDef[] = [
  { 
    field: 'id',    
    sortable: false,
    renderHeader: (params: GridColumnHeaderParams) => (
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

// fetchMore({
//   variables: {
//     offset: data.feed.length
//   },
// })
const DEFAULT_PAGE_SIZE = 10;

export default function CharactersTable() {
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const { loading, error, data, fetchMore } = useQuery(GET_ALL_PEOPLE, {
    variables: {
      offset: 0,
      limit: DEFAULT_PAGE_SIZE
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  console.log(data);

  return (
    <styles.Container>
      <Search />
      <DataGrid
        autoHeight
        rows={data.allPeople.people}
        columns={columns}
        paginationMode="server"
        pageSize={pageSize}
        disableColumnMenu
        disableColumnSelector
        disableSelectionOnClick
      />
    </styles.Container>
  );
}