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

  favor(id: string): void {
    const favorites: string | null = localStorage.getItem(ENTITY_NAME);
    const parsed = JSON.parse(String(favorites));
    const ids = new Set(parsed.ids);

    if (parsed.cache[id]) {
      delete parsed.cache[id];
      ids.delete(id);
      parsed.ids = Array.from(ids);
      localStorage.setItem(ENTITY_NAME, JSON.stringify(parsed));
      return;
    }

    ids.add(id);
    parsed.ids = Array.from(ids);
    parsed.cache[id] = 1;
    localStorage.setItem(ENTITY_NAME, JSON.stringify(parsed));
  }
}

export default new FavoritesService;
