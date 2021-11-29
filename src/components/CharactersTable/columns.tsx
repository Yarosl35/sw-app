import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { IFavorites } from '../../services/favorites.service';
import { ReactComponent as HeartIcon } from '../../assets/glyphs/glyph_heart_16.svg';
import { ReactComponent as HeartIconFilled } from '../../assets/glyphs/glyph_heart_fill_16.svg';
import * as styles from './characters-table.styles';

export interface IColumnsBuilder {
  onFavorited: Function;
  favorites: IFavorites;
}

export const buildColumns = (props: IColumnsBuilder) => {
  const favorHandler = (params: GridRenderCellParams) => () => {
    props.onFavorited(params);
  }

  const columns: GridColDef[] = [
    {
      field: 'id',
      sortable: false,
      renderHeader: () => (
        <HeartIconFilled />
      ),
      renderCell: (params: GridRenderCellParams) => {
        if (props.favorites.cache[params.row.id]) {
          return (
            <styles.HeartIconButton aria-label="favorite" onClick={favorHandler(params)}>
              <HeartIconFilled fill="red" />
            </styles.HeartIconButton>
          );
        }

        return (
          <styles.HeartIconButton aria-label="favorite" onClick={favorHandler(params)}>
            <HeartIcon />
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

  return columns;
}
