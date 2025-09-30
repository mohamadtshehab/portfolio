import { User, ShareNetworkIcon } from '@phosphor-icons/react';
import { CharacterData } from './CharacterProfile'; // Assuming path to CharacterProfile/CharacterData

interface SidebarProps {
  isSidebarOpen: boolean;
  profiles: CharacterData[]; // Use the defined CharacterData type
  onSelectCharacter: (profile: CharacterData) => void;
  onShowNetwork: () => void;
}

const Sidebar = ({ isSidebarOpen, profiles, onSelectCharacter, onShowNetwork }: SidebarProps) => {
  return (
    <aside
      className={`flex-shrink-0 bg-theme text-white transition-all duration-300 ${
        isSidebarOpen ? 'w-64' : 'w-0 overflow-hidden'
      }`}
    >
      <div className="flex h-full flex-col">
        <div className="p-4">
          <button 
            onClick={onShowNetwork} 
            className="network-button"
          >
            <ShareNetworkIcon size={24} />
            <span>Character Network</span>
          </button>
          <div className="w-full h-px bg-gradient-to-r from-transparent via-white opacity-30 to-transparent my-8"></div>
          <div className="flex items-center gap-3">
            <User size={24} />
            <h3 className="text-md font-bold">Character Profiles</h3>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto px-4">
          <ul className="flex flex-col gap-2">
            {profiles.map((profile) => (
              <li key={profile.id}>
                <button
                  onClick={() => onSelectCharacter(profile)}
                  className="w-full flex items-center gap-3 rounded p-2 text-sm text-left font-medium text-neutral-400 transition-colors duration-150 hover:bg-white/10 hover:text-white"
                >
                  <User size={20} />
                  <span>{profile.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;