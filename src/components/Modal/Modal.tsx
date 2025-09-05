import type { Character } from '../../types';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  character: Character | null;
}
export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, character }) => {
  if (!isOpen || !character) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-50"
      onClick={handleOverlayClick}
    >
      <div className="bg-black border border-solid border-white rounded-lg max-w-2xl w-full max-h-90vh overflow-y-auto text-white">
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>

          <div className="flex flex-col md:flex-row">
            <img
              src={character.image}
              alt={character.name}
              className="w-full md:w-1/2 object-cover"
            />

            <div className="p-6 md:w-1/2">
              <h2 className="text-2xl font-bold mb-4">{character.name}</h2>

              <div className="space-y-3">
                <p>
                  <span className="font-semibold">Status:</span>{' '}
                  <span className="">{character.status}</span>
                </p>

                <p>
                  <span className="font-semibold">Species:</span>{' '}
                  {character.species}
                </p>

                <p>
                  <span className="font-semibold">Gender:</span>{' '}
                  {character.gender}
                </p>

                <p>
                  <span className="font-semibold">Origin:</span>{' '}
                  {character.origin?.name}
                </p>

                <p>
                  <span className="font-semibold">Location:</span>{' '}
                  {character.location?.name}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
