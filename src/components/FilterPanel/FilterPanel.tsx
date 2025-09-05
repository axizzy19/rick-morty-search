import { useEffect, useState } from 'react';
import { defaultFilters, type CharacterFilters } from '../../types';

interface FilterProps {
  onFilter: (filters: CharacterFilters) => void;
  initialFilters: CharacterFilters;
}

const STATUS_OPTIONS = [
  { value: '', label: 'Все' },
  { value: 'alive', label: 'alive' },
  { value: 'dead', label: 'dead' },
  { value: 'unknown', label: 'unknown' },
];

const SPECIES_OPTIONS = [
  { value: '', label: 'Все' },
  { value: 'Human', label: 'Human' },
  { value: 'Alien', label: 'Alien' },
  { value: 'Robot', label: 'Robot' },
  { value: 'Animal', label: 'Animal' },
  { value: 'Mythological Creature', label: 'Mythological Creature' },
];

export const FilterPanel: React.FC<FilterProps> = ({
  onFilter,
  initialFilters,
}) => {
  const [filters, setFilters] = useState<CharacterFilters>(initialFilters);

  useEffect(() => {
    setFilters(initialFilters);
  }, [initialFilters]);

  const handleFilterChange = (key: keyof CharacterFilters, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilter(newFilters);
  };

  const handleReset = () => {
    const resetFilters = { ...defaultFilters };
    setFilters(resetFilters);
    onFilter(resetFilters);
  };

  return (
    <div>
      <div className="flex flex-col gap-5 sm:gap-8 mb-4 md:w-96">
        <div>
          <label className="block text-sm font-medium text-white mb-1">
            Имя персонажа
          </label>
          <input
            type="text"
            value={filters.name || ''}
            onChange={(e) => handleFilterChange('name', e.target.value)}
            className="w-full p-2 border border-white rounded-md bg-black text-white focus:ring-2 focus:ring-white focus:border-transparent cursor-pointer hover:ring-2 hover:ring-white"
            placeholder="rick"
          />
        </div>

        <div className="flex sm:flex-row flex-col md:gap-10 gap-5 content-between">
          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Жив?
            </label>
            <select
              value={filters.status || ''}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              className="w-full p-2 border border-white rounded-md bg-black text-white focus:ring-2 focus:ring-white focus:border-transparent cursor-pointer hover:ring-2 hover:ring-white"
            >
              {STATUS_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Раса
            </label>
            <select
              value={filters.species || ''}
              onChange={(e) => handleFilterChange('species', e.target.value)}
              className="w-full p-2 border border-white rounded-md bg-black text-white focus:ring-2 focus:ring-white focus:border-transparent cursor-pointer hover:ring-2 hover:ring-white"
            >
              {SPECIES_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-1">
            Эпизод
          </label>
          <input
            type="number"
            min="1"
            value={filters.episode}
            onChange={(e) => handleFilterChange('episode', e.target.value)}
            className="w-full p-2 border border-white rounded-md bg-black text-white focus:ring-2 focus:ring-white focus:border-transparent cursor-pointer hover:ring-2 hover:ring-white"
            placeholder="1"
          />
        </div>
      </div>

      <button
        onClick={handleReset}
        className="px-4 py-2 bg-gray-700 text-white rounded-md border border-white hover:bg-gray-600 transition-colors"
      >
        Сбросить фильтры
      </button>
    </div>
  );
};

export default FilterPanel;
