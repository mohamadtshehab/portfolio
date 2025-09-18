import { ArrowLeft } from '@phosphor-icons/react';

const CharacterProfile = ({ character, onBack, onShowNetwork }) => {
  return (
    <div className="fixed inset-0 z-50 bg-[#111827] text-white animate-fadeIn flex flex-col">
      <div className="p-8 flex-1 overflow-y-auto">
        <div className="flex justify-between items-start mb-6">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Novel
          </button>
          <button 
            onClick={() => onShowNetwork(character.id)}
            className="px-5 py-2.5 bg-green-600 hover:bg-green-700 rounded-md transition-colors"
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