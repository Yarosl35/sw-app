import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import FavoritesAmountIndicator from '../../components/FavoritesAmountIndicator/favorites-amount-indicator.component';
import CharactersTable from '../../components/CharactersTable/characters-table.component';
import * as styles from './home.styles';

const HomeContainer = () => {
  return (
    <Container fixed>
      <Grid container spacing={2}>
        <Grid item sm={12}>
          <styles.Header>Fans</styles.Header>
        </Grid>

        <Grid item sm={6}>
          <FavoritesAmountIndicator />
        </Grid>
        <Grid item sm={6}>
          <FavoritesAmountIndicator />
        </Grid>

        <Grid item sm={12}>
          <CharactersTable />
        </Grid>
      </Grid>
    </Container>
  );
}

export default HomeContainer;
