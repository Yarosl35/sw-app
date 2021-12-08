import IFavorites from "./favorites.interface";

export default interface IColumnsBuilder {
  onFavorited: Function;
  favorites: IFavorites;
}