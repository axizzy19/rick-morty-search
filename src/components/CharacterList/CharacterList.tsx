import type { Character } from "../../types";
import CharacterCard from "../CharacterCard/CharacterCard";

interface CharacterListProps {
  characters: Character[];
  loading: boolean;
  onCharacterClick: (character: Character) => void;
}

export const CharacterList: React.FC<CharacterListProps> = ({
  characters, loading, onCharacterClick
}) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!characters.length) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">Персонажи не найдены</p>
      </div>
    );
  }


  return (
    <div className="flex flex-col gap-6">
      {characters.map(character => (
        <CharacterCard
          key={character.id}
          character={character}
          onClick={onCharacterClick}
        />
      ))}
    </div>
  )
}