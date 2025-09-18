import { User, ShareNetwork } from '@phosphor-icons/react';

const Sidebar = ({ isSidebarOpen, profiles, onSelectCharacter, onShowNetwork }) => {
  return (
    <aside
      className={`flex-shrink-0 bg-neutral-900 text-white transition-all duration-300 ${
        isSidebarOpen ? 'w-64' : 'w-0 overflow-hidden'
      }`}
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between p-4 h-[81px]">
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
                  className="w-full flex items-center gap-3 rounded p-2 text-sm text-left font-medium text-neutral-400 transition-colors duration-150 hover:bg-neutral-800 hover:text-white"
                >
                  <User size={20} />
                  <span>{profile.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="p-4">
          <button 
            onClick={onShowNetwork} 
            className="w-full flex items-center gap-3 rounded p-2 text-sm font-medium text-neutral-400 transition-colors duration-150 hover:bg-neutral-800 hover:text-white"
          >
            <ShareNetwork size={24} />
            <span>Character Network</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;