import { useEffect, useState } from 'react';
import type { Character } from '../../types';

interface CharacterCardProps {
  character: Character;
  onClick: (character: Character) => void;
  index?: number;
  animate?: boolean;
}

export const CharacterCard: React.FC<CharacterCardProps> = ({
  character,
  onClick,
  index = 0,
  animate = false,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (animate) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, index * 100);

      return () => clearTimeout(timer);
    }
  }, [animate, index]);

  return (
    <div
      className={`text-white flex xl:gap-20 lg:gap-15 md:flex-row md:gap-10 gap-1 flex-col rounded-2xl border border-white px-6 py-3 cursor-pointer hover:scale-x-110 hover:scale-y-110 duration-300
        ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      onClick={() => onClick(character)}
    >
      <h3 className="font-semibold">{character.name}</h3>
      <h4>{character.status}</h4>
      <h4>{character.species}</h4>
    </div>
  );
};

export default CharacterCard;
