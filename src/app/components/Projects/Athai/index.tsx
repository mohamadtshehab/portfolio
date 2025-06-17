// components/AthaiProject.tsx
"use client";

import { useState } from 'react';
import TabButton from './TabButton';
import ModelViewer from './ModelViewer';
import examples from './examples';

const AthaiProject = () => {
  const [activeTab, setActiveTab] = useState<'example1' | 'example2'>('example2');

  return (
        <div className="pt-2">
          <div className="flex justify-between mb-6">
            <div className="flex gap-4">
              <TabButton
                isActive={activeTab === 'example2'}
                onClick={() => setActiveTab('example2')}
              >
                Text to 3D Model
              </TabButton>
              <TabButton
                isActive={activeTab === 'example1'}
                onClick={() => setActiveTab('example1')}
              >
                Image to 3D Model
              </TabButton>
            </div>
          </div>

          <ModelViewer
            key={activeTab}
            prompt={examples[activeTab].prompt}
            imageUrl={examples[activeTab].imageUrl}
            modelUrl={examples[activeTab].modelUrl}
            mtlUrl={examples[activeTab].mtlUrl}
          />
          
        </div>
  );
};

export default AthaiProject;