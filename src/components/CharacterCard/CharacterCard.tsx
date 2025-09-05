import type { Character } from "../../types";

interface CharacterCardProps {
  character: Character;
  onClick: (character: Character) => void;
}

export const CharacterCard: React.FC<CharacterCardProps> = ({ character, onClick }) => {

  return (
    <div
      className="text-white flex flex-row gap-20 rounded-2xl border border-white px-6 py-3"
      onClick={() => onClick(character)}
    >
      <h3>{character.name}</h3>
      <h4>{character.status}</h4>
      <h4>{character.species}</h4>
    </div>
  )
};

export default CharacterCard;