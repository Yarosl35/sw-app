const ENTITY_NAME = 'sw-app-favorites';

export interface IFavorites {
  cache: any;
  ids: string[];
}

class FavoritesService {
  constructor() {
    this.initialize();
  }

  private initialize(): void {
    const favorites: string | null = localStorage.getItem(ENTITY_NAME);
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
    const favorites: string | null = localStorage.getItem(ENTITY_NAME);
    const parsed = JSON.parse(String(favorites));
    return parsed;
  }

  favor(data: any): void {
    const favorites: string | null = localStorage.getItem(ENTITY_NAME);
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

  countByGender(gender: string | Function): number {
    const favorites: string | null = localStorage.getItem(ENTITY_NAME);
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

  clear(): void {
    this.installEmptyStorage();
  }
}

export default new FavoritesService();
