import IPerson from "./person.interface";

interface ICache {
  [key: string]: IPerson;
}

export default interface IFavorites {
  cache: ICache;
  ids: string[];
};