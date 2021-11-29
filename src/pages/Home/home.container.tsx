import React, { useMemo, useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';


import FavoritesAmountIndicator from '../../components/FavoritesAmountIndicator/favorites-amount-indicator.component';
import CharactersTable from '../../components/CharactersTable/characters-table.component';
import FavoritesContext from '../../contexts/favorites.context';
import FavoritesService from '../../services/favorites.service';
import * as styles from './home.styles';

const HomeContainer = () => {
  const [state, setState] = useState({ totalFans: 0, maleFans: 0, femaleFans: 0, otherFans: 0 });

  const providerValue = useMemo(() => {
    return {
      updateStatistics: () => {
        const femaleFans = FavoritesService.countByGender('female');
        const maleFans = FavoritesService.countByGender('male');
        const otherFans = FavoritesService.countByGender((gender: string) => !['male', 'female'].includes(gender));

        setState({
          maleFans,
          femaleFans,
          otherFans,
          totalFans: maleFans + femaleFans + otherFans,
        });
      },
    }
  }, []);

  useEffect(() => {
    providerValue.updateStatistics();
  }, [providerValue]);

  const clearHandler = () => {
    FavoritesService.clear();
    providerValue.updateStatistics();
  }

  return (
    <Container fixed>
      <Grid container spacing={2}>
        <FavoritesContext.Provider value={providerValue}>
          <Grid item sm={12}>
            <styles.HeaderBox>
              <h1>Fans</h1>
              <styles.ClearButton variant="outlined" color="error" onClick={clearHandler}>
                Clear fans
              </styles.ClearButton>
            </styles.HeaderBox>
          </Grid>
          <Grid item sm={4}>
            <FavoritesAmountIndicator label="Female Fans" value={state.femaleFans} />
          </Grid>
          <Grid item sm={4}>
            <FavoritesAmountIndicator label="Male Fans" value={state.maleFans} />
          </Grid>
          <Grid item sm={4}>
            <FavoritesAmountIndicator label="Others" value={state.otherFans} />
          </Grid>
          <Grid item sm={12}>
            <CharactersTable totalFans={state.totalFans} />
          </Grid>
        </FavoritesContext.Provider>
      </Grid>
    </Container>
  );
}

export default HomeContainer;
