import { ArrowLeft } from '@phosphor-icons/react';
// Define the structure of the 'details' object (the values in the inner dictionary)
interface CharacterDetails {
  Role: string;
  'Physical Characteristics': string;
  Personality: string;
  Events: string;
  Relationships: string;
  Aliases: string;
}

// Define the structure of a single character object
export interface CharacterData {
  id: string;
  name: string;
  details: CharacterDetails;
}

// Define the component's Props interface
interface CharacterProfileProps {
  character: CharacterData; 
  onBack: () => void;
  onShowNetwork: (characterId: string) => void; 
}

const CharacterProfile = ({ character, onBack, onShowNetwork }: CharacterProfileProps) => {
  return (
    <div className="fixed inset-0 z-50 bg-theme-100 text-white animate-fadeIn flex flex-col">
      <div className="p-8 flex-1 overflow-y-auto">
        <div className="flex justify-between items-start mb-6">
          <button 
            onClick={onBack}
            className="custom-button"
          >
            <ArrowLeft size={20} />
            Back to Novel
          </button>
          <button 
            onClick={() => onShowNetwork(character.id)}
            className="custom-button"
          >
            Show Network
          </button>
        </div>
        
        <h2 className="text-4xl font-bold mb-8 border-b border-gray-700 pb-4">{character.name}</h2>
        
        <div className="space-y-4">
          {Object.entries(character.details).map(([key, value]) => (
            <div key={key} className="flex flex-col md:flex-row py-3 border-b border-gray-700">
              <p className="w-full md:w-1/4 font-semibold text-gray-400">{key}</p>
              <p className="w-full md:w-3/4 text-lg">{value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CharacterProfile;