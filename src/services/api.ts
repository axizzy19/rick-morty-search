import type { ApiResponse, Character, CharacterFilters, Episode } from "../types";

const BASE_URL = 'https://rickandmortyapi.com/api';

export const api = {
  async getCharacters(filters: CharacterFilters): Promise<ApiResponse<Character>> {
    const params = new URLSearchParams();

    if (filters.name) params.append('name', filters.name);
    if (filters.status) params.append('status', filters.status);
    if (filters.species) params.append('species', filters.species);
    if (filters.episode) params.append('episode', filters.episode);

    const response = await fetch(`${BASE_URL}/character?${params}`);
    if (!response.ok) throw new Error('Не получилось загрузить персонажей');
    return response.json();
  },

  async getCharacter(id: number): Promise<Character> {
    const response = await fetch(`${BASE_URL}/character/${id}`);
    if (!response.ok) throw new Error('Такого персонажа нет');
    return response.json();
  },

  async getEpisodes(): Promise<ApiResponse<Episode>> {
    const response = await fetch(`${BASE_URL}/episode`);
    if (!response.ok) throw new Error('Эпизоды отсутствуют');
    return response.json();
  }
}