import React from 'react';

export interface IFavoritesContext {
  updateStatistics: Function;
}

const FavoritesContext = React.createContext<IFavoritesContext | null>(null);
export default FavoritesContext;
