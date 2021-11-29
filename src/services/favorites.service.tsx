const ENTITY_NAME = 'sw-app-favorites';

type StorageItem = string | null;

export interface IFavorites {
  cache: any;
  ids: string[];
}

class FavoritesService {
  constructor() {
    this.initialize();
  }

  private initialize(): void {
    const favorites: StorageItem = localStorage.getItem(ENTITY_NAME);
    if (favorites) {
      return;
    }

    this.installEmptyStorage();
  }

  private installEmptyStorage(): void {
    localStorage.setItem(
      ENTITY_NAME,
      JSON.stringify({
        cache: {},
        ids: []
      }),
    );
  }

  getFavorites(): IFavorites {
    const favorites: StorageItem = localStorage.getItem(ENTITY_NAME);
    const parsed = JSON.parse(String(favorites));
    return parsed;
  }

  // Favor/unfavor characteers. Can be used both for adding new items to the
  // storage and for removing values from there as well. 
  favor(data: any): void {
    const favorites: StorageItem = localStorage.getItem(ENTITY_NAME);
    const parsed = JSON.parse(String(favorites));
    const ids = new Set(parsed.ids);

    if (parsed.cache[data.id]) {
      delete parsed.cache[data.id];
      ids.delete(data.id);
      parsed.ids = Array.from(ids);
      localStorage.setItem(ENTITY_NAME, JSON.stringify(parsed));
      return;
    }

    ids.add(data.id);
    parsed.ids = Array.from(ids);
    parsed.cache[data.id] = data;
    localStorage.setItem(ENTITY_NAME, JSON.stringify(parsed));
  }

  // Gets an amount of uniq favorites by gender string or callback parameter
  countByGender(gender: string | Function): number {
    const favorites: StorageItem = localStorage.getItem(ENTITY_NAME);
    const parsed = JSON.parse(String(favorites));

    let count = 0;
    parsed.ids.forEach((id: string) => {
      const item = parsed.cache[id];

      // check for gender as a string
      if (typeof gender === 'string') {
        if (item.gender === gender) count++;
        return;
      }

      // gender callback returns boolean whether it should be counted
      if (gender(item.gender)) {
        count++;
      }
    });

    return count;
  }

  // remove all items from localStorage and install empty structures
  clear(): void {
    this.installEmptyStorage();
  }
}

export default new FavoritesService();
