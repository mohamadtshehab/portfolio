'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import { characterProfiles } from './characters';
import Sidebar from './Sidebar';
import Header from './Header';
import NovelText from './NovelText';
import CharacterProfile from './CharacterProfile';
import CharacterNetwork from './CharacterNetwork';
import { generateNetworkElements, generateSingleCharacterNetwork } from './networkElements';
import type { ElementDefinition } from 'cytoscape';

type Character = (typeof characterProfiles)[number];
export default function ReaderScreen() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  // NEW STATE: Holds the element data for the active network, or null if none is active.
  const [activeNetworkElements, setActiveNetworkElements] = useState<ElementDefinition[] | null>(null);
  // Gate: whether the reader has finished reading
  const [hasFinishedReading, setHasFinishedReading] = useState(false);
  
  // Memoize the global network data so it's only calculated once
  const globalNetworkElements = useMemo(() => generateNetworkElements(), []);

  const handleSelectCharacter = (character: Character) => {
    if (!hasFinishedReading) return;
    setSelectedCharacter(character);
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };

  const handleBackToNovel = () => {
    setSelectedCharacter(null);
  };

  // --- NEW NETWORK HANDLERS ---
  const handleShowGlobalNetwork = () => {
    if (!hasFinishedReading) return;
    setActiveNetworkElements(globalNetworkElements);
  };

  const handleShowCharacterNetwork = (characterId: string) => {
    if (!hasFinishedReading) return;
    const elements = generateSingleCharacterNetwork(characterId);
    setActiveNetworkElements(elements);
  };

  const handleHideNetwork = () => {
    setActiveNetworkElements(null);
  };
  
  // Scroll detection for reading completion
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = scrollContainer as HTMLDivElement;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 5; // 5px tolerance
      
      if (isAtBottom) {
        setHasFinishedReading(true);
      }
    };

    scrollContainer.addEventListener('scroll', handleScroll);
    
    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-neutral-50 font-sans text-neutral-800">
      <div className="flex h-screen max-h-screen overflow-hidden">
        {hasFinishedReading && (
          <Sidebar 
            isSidebarOpen={isSidebarOpen}
            profiles={characterProfiles}
            onSelectCharacter={handleSelectCharacter}
            onShowNetwork={handleShowGlobalNetwork}
          />
        )}

        <div className="flex-1 flex flex-col h-screen">
          <Header onToggleSidebar={() => setSidebarOpen(!isSidebarOpen)} hasFinishedReading={hasFinishedReading} />
          <NovelText scrollRef={scrollContainerRef} />
        </div>
      </div>

      {hasFinishedReading && selectedCharacter && (
        <CharacterProfile 
          character={selectedCharacter} 
          onBack={handleBackToNovel}
          onShowNetwork={handleShowCharacterNetwork}
        />
      )}
      
      {/* Conditionally render the network if there are active elements */}
      {hasFinishedReading && activeNetworkElements && (
        <CharacterNetwork 
          elements={activeNetworkElements}
          onClose={handleHideNetwork}
        />
      )}
    </div>
  );
}