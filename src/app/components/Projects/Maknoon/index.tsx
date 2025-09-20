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
  // Note visibility state
  const [showNote, setShowNote] = useState(true);
  
  // Memoize the global network data so it's only calculated once
  const globalNetworkElements = useMemo(() => generateNetworkElements(), []);

  const handleSelectCharacter = (character: Character) => {
    if (!hasFinishedReading || showNote) return;
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
    if (!hasFinishedReading || showNote) return;
    setActiveNetworkElements(globalNetworkElements);
  };

  const handleShowCharacterNetwork = (characterId: string) => {
    if (!hasFinishedReading || showNote) return;
    const elements = generateSingleCharacterNetwork(characterId);
    setActiveNetworkElements(elements);
  };

  const handleHideNetwork = () => {
    setActiveNetworkElements(null);
  };
  
  // Scroll detection for reading completion
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer || showNote) return;

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
  }, [showNote]);

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-neutral-50 font-sans text-neutral-800">
      {/* Note overlay */}
      {showNote && (
        <div 
          className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50 bg-theme-100 text-white p-4 rounded-lg shadow-lg max-w-md mx-4 cursor-pointer"
          onClick={() => setShowNote(false)}
        >
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-sm">ℹ️</span>
            </div>
            <div className="text-sm">
              <p className="font-semibold mb-1">Note:</p>
              <p>This interactive demo uses a real story to demonstrate the project&apos;s capabilities. Character names have been changed to protect privacy while maintaining the narrative flow.</p>
              <p><b>Click on me to start the demo.</b></p>
            </div>
          </div>
        </div>
      )}
      
      <div className="flex h-screen max-h-screen overflow-hidden">
        {hasFinishedReading && !showNote && (
          <Sidebar 
            isSidebarOpen={isSidebarOpen}
            profiles={characterProfiles}
            onSelectCharacter={handleSelectCharacter}
            onShowNetwork={handleShowGlobalNetwork}
          />
        )}

        <div className="flex-1 flex flex-col h-screen">
          <Header onToggleSidebar={() => setSidebarOpen(!isSidebarOpen)} hasFinishedReading={hasFinishedReading && !showNote} showNote={showNote} />
          <NovelText scrollRef={scrollContainerRef} />
        </div>
      </div>

      {hasFinishedReading && !showNote && selectedCharacter && (
        <CharacterProfile 
          character={selectedCharacter} 
          onBack={handleBackToNovel}
          onShowNetwork={handleShowCharacterNetwork}
        />
      )}
      
      {/* Conditionally render the network if there are active elements */}
      {hasFinishedReading && !showNote && activeNetworkElements && (
        <CharacterNetwork 
          elements={activeNetworkElements}
          onClose={handleHideNetwork}
        />
      )}
    </div>
  );
}