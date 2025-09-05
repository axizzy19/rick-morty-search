import { useLocalStorage } from './useLocalStorage';
import type { AppState } from '../types';

export const useAppState = () => {
  const [appState, setAppState] = useLocalStorage<AppState>('appState', {
    filters: {
      name: '',
      status: '',
      species: '',
      episode: '',
    },
    characters: [],
    selectedCharacter: null,
    isModalOpen: false,
  });

  const updateAppState = (updater: (prev: AppState) => AppState) => {
    setAppState(updater);
  };

  return [appState, updateAppState] as const;
};
