import { useEffect, useState } from 'react'
import './App.css'
import { CharacterList } from './components/CharacterList/CharacterList'
import FilterPanel from './components/FilterPanel/FilterPanel'
import { defaultAppState, type Character, type CharacterFilters } from './types'
import { api } from './services/api'
import Modal from './components/Modal/Modal'


const getFromLocalStorage = <T,>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key);
    if (item === null || item === 'undefined') {
      return defaultValue;
    }
    return JSON.parse(item);
  } catch (error) {
    console.error(`Error reading from localStorage key "${key}":`, error);
    return defaultValue;
  }
};

function App() {
  const [filters, setFilters] = useState<CharacterFilters>(() => 
    getFromLocalStorage('characterFilters', defaultAppState.filters)
  );

  const [characters, setCharacters] = useState<Character[]>(() => 
    getFromLocalStorage('characters', defaultAppState.characters)
  );

  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(() => 
    getFromLocalStorage('selectedCharacter', defaultAppState.selectedCharacter)
  );

  const [isModalOpen, setIsModalOpen] = useState<boolean>(() => 
    getFromLocalStorage('isModalOpen', defaultAppState.isModalOpen)
  );

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('characterFilters', JSON.stringify(filters));
    } catch (error) {
      console.error('Error saving filters to localStorage:', error);
    }
  }, [filters]);

  useEffect(() => {
    try {
      localStorage.setItem('characters', JSON.stringify(characters));
    } catch (error) {
      console.error('Error saving characters to localStorage:', error);
    }
  }, [characters]);

  useEffect(() => {
    try {
      localStorage.setItem('selectedCharacter', JSON.stringify(selectedCharacter));
    } catch (error) {
      console.error('Error saving selectedCharacter to localStorage:', error);
    }
  }, [selectedCharacter]);

  useEffect(() => {
    try {
      localStorage.setItem('isModalOpen', JSON.stringify(isModalOpen));
    } catch (error) {
      console.error('Error saving isModalOpen to localStorage:', error);
    }
  }, [isModalOpen]);

  useEffect(() => {
    if (characters.length === 0) {
      loadCharacters(filters);
    }
  }, []);

  const loadCharacters = async (filters: CharacterFilters) => {
    setLoading(true);
    try {
      const data = await api.getCharacters(filters);
      setCharacters(data.results || []);
      setFilters(filters);
    } catch (error) {
      console.error('Error loading characters:', error);
      setCharacters([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = (newFilters: CharacterFilters) => {
    loadCharacters(newFilters);
  };

  const handleCharacterClick = (character: Character) => {
    setIsModalOpen(true);
    setSelectedCharacter(character);
  }

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCharacter(null);
  }


  return (
    <div className="w-screen bg-black flex flex-col m-0 p-0 px-5 py-8">
      <div className='max-w-2xl mx-auto flex flex-col lg:px-10 md:px-10 sm:px-5 px-5 2xl:gap-10 gap-5 rounded-3xl border border-white px-20 pb-10'> 
        <h1 className="text-white font-semibold pt-5 text-3xl">Вселенная Рик и Морти</h1>
        <FilterPanel
          onFilter={handleFilter}
          initialFilters={filters}
        />
        <CharacterList
          characters={characters}
          loading={loading}
          onCharacterClick={handleCharacterClick}
        />
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          character={selectedCharacter}
        />
      </div>
    </div>
  )
}

export default App
