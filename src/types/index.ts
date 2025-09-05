export interface Character {
  id: number;
  name: string;
  status: 'Alive' | 'Dead' | 'unknown';
  species: string;
  type: string;
  gender: 'Female' | 'Male' | 'Genderless' | 'unknown';
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
}

export interface ApiResponse<T> {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: T[];
}

export interface CharacterFilters {
  name?: string;
  status?: string;
  species?: string;
  episode?: string;
}

export const defaultFilters: CharacterFilters = {
  name: '',
  status: '',
  species: '',
  episode: ''
};

export interface AppState {
  filters: CharacterFilters;
  characters: Character[];
  selectedCharacter: Character | null;
  isModalOpen: boolean;
}

export const defaultAppState: AppState = {
  filters: defaultFilters,
  characters: [],
  selectedCharacter: null,
  isModalOpen: false
};