"use client";

import { useState, Suspense } from 'react';
import { FaCube } from 'react-icons/fa'; // Keep FaCube if used elsewhere
import { IoSparkles } from 'react-icons/io5';
import { ArrowLeft } from 'lucide-react'; // Import the new icon
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Model } from './Model';
import Image from 'next/image';

interface ModelViewerProps {
  modelUrl: string;
  mtlUrl: string;
  prompt?: string;
  imageUrl?: string;
}

const ModelViewer = ({ modelUrl, mtlUrl, prompt, imageUrl }: ModelViewerProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showModel, setShowModel] = useState(false);
  const [isImageExpanded, setIsImageExpanded] = useState(false);

  const handleGenerateClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setShowModel(true);
    }, 2000);
  };

  const toggleImageExpand = () => {
    setIsImageExpanded(!isImageExpanded);
  };

  return (
    <div className="relative">
      {!showModel ? (
        <div className="space-y-6">
          <div className="flex flex-col items-start gap-6">
            <div className="w-full">
              {prompt ? (
                <>
                  <h4 className="text-white font-medium mb-2">Prompt:</h4>
                  <p className="text-white italic text-lg">{prompt}</p>
                </>
              ) : (
                <div className="relative w-full h-64 overflow-hidden rounded-lg cursor-pointer transition-transform hover:scale-[1.02]">
                  {imageUrl && (
                    <Image
                      src={imageUrl}
                      alt="Reference furniture"
                      layout="fill"
                      objectFit="contain"
                      onClick={toggleImageExpand}
                    />
                  )}
                </div>
              )}
            </div>
            <button
              onClick={handleGenerateClick}
              className={`${
                isLoading
                  ? 'cursor-not-allowed'
                  : 'hover:bg-white/10 hover:scale-105 active:scale-95 border border-white border-opacity-30'
              } text-white px-8 py-4 rounded-xl flex items-center gap-3 transition-all duration-200 mx-auto`}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="relative animate-pulse">
                    <IoSparkles className="text-2xl text-white" />
                  </div>
                  <span className="font-semibold">Generating model...</span>
                </>
              ) : (
                <>
                  <FaCube className="text-2xl" />
                  <span className="font-semibold">Generate</span>
                </>
              )}
            </button>
          </div>
        </div>
      ) : (
        <div className=" h-[250px]">
          <Canvas
            camera={{ position: [0, 2, 5], fov: 50 }}
          >
            <ambientLight intensity={0.8} />
            <directionalLight
              position={[5, 10, 5]}
              intensity={1.5}
              castShadow
              shadow-mapSize={[1024, 1024]}
            />
            <directionalLight
              position={[-5, 5, -5]}
              intensity={1}
            />
            <pointLight
              position={[0, 10, 0]}
              intensity={0.8}
            />
            <pointLight
              position={[0, -10, 0]}
              intensity={0.5}
            />
            <hemisphereLight
              args={[0xffffff, 0xe0e0e0, 0.5]}
            />

            <Suspense fallback={null}>
              <Model modelUrl={modelUrl} mtlUrl={mtlUrl} />
            </Suspense>
            <OrbitControls
              enableDamping
              dampingFactor={0.05}
              minDistance={3}
              maxDistance={10}
            />
          </Canvas>
          <button
            onClick={() => setShowModel(false)}
            // Changed position to left-4, added background, padding, rounded corners, and shadow
            className="absolute top-4 left-4 z-10 bg-white/20 text-white p-2 rounded-full shadow-lg hover:bg-white/30 transition-all duration-200 cursor-pointer"
          >
            <ArrowLeft className="text-2xl" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ModelViewer;
