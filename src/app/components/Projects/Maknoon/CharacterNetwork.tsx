// components/CharacterNetwork.tsx
'use client';

import React, { FC, useEffect, useMemo, useRef } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import { ArrowLeft } from '@phosphor-icons/react';
import type cytoscape from 'cytoscape';
import type { ElementDefinition, LayoutOptions } from 'cytoscape';

// --- Define the types for the component's props ---
interface CharacterNetworkProps {
  elements: ElementDefinition[];
  onClose: () => void;
}

const CharacterNetwork: FC<CharacterNetworkProps> = ({ elements, onClose }) => {
  const cyRef = useRef<cytoscape.Core | null>(null);

  // Layout configuration for the graph (tuned to reduce overlap and spread nodes)
  const layout: LayoutOptions = useMemo(() => ({
    name: 'cose',
    idealEdgeLength: 200,
    nodeRepulsion: 12000,
    edgeElasticity: 100,
    gravity: 1,
    numIter: 1000,
    initialTemp: 1000,
    coolingFactor: 0.99,
    minTemp: 1.0,
    fit: true,
    padding: 50,
    randomize: true,
    animate: false,
  }), []);

  // Handle cytoscape ready event
  const handleCyReady = (cy: cytoscape.Core) => {
    cyRef.current = cy;
    
    // Add error handling for layout
    try {
      const layoutInstance = cy.layout(layout);
      layoutInstance.run();
      // Ensure proper sizing after the modal becomes visible
      requestAnimationFrame(() => {
          cy.resize();
          cy.fit();
      });
    } catch (error) {
      console.warn('Layout error:', error);
    }
  };

  // Re-run layout when elements change or when the component is shown
  useEffect(() => {
    const cy = cyRef.current;
    if (!cy) return;

    try {
      const layoutInstance = cy.layout(layout);
      layoutInstance.run();
      // Defer resize/fit to ensure container has finalized size
      requestAnimationFrame(() => {
        cy.resize();
        cy.fit();
      });
    } catch (error) {
      console.warn('Layout rerun error:', error);
    }
  }, [elements, layout]);

  // Stylesheet for the graph nodes and edges
  const stylesheet = [
    {
      selector: 'node',
      style: {
        'backgroundColor': '#0B1120',
        'label': 'data(label)',
        'color': '#FFFFFF',
        'text-valign': 'center',
        'fontSize': '14px',
        'fontWeight': 'bold',
        'shape': 'round-rectangle',
        'width': '120px',
        'height': '50px',
        'text-wrap': 'wrap',
        'text-max-width': '110px',
      },
    },
    {
      selector: 'node.central',
      style: {
        'backgroundColor': '#2563EB', // A distinct blue color
        'border-color': '#93C5FD',
        'border-width': 3,
      },
    },
    {
      selector: 'edge',
      style: {
        'width': 3,
        'lineColor': '#4A5568',
        'curve-style': 'bezier',
        'label': 'data(label)',
        'color': '#0B1120',
        'fontSize': '12px',
        'fontWeight': 'bold',
        'textBackgroundColor': '#60A5FA',
        'textBackgroundOpacity': 1,
        'textBackgroundPadding': '4px',
        'textBackgroundShape': 'round-rectangle',
      },
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-[#111827] animate-fadeIn flex flex-col">
       {/* Header with Back Button */}
      <div className="p-8 pb-0">
         <button
          onClick={onClose}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md transition-colors text-white"
        >
          <ArrowLeft size={20} />
          Back
        </button>
      </div>

       {/* Cytoscape Container */}
      <div className="flex-1 p-8">
        <CytoscapeComponent
          elements={elements}
          stylesheet={stylesheet}
          style={{ width: '100%', height: '100%', borderRadius: '8px' }}
          cy={(cy) => {
            handleCyReady(cy);
          }}
        />
      </div>
    </div>
  );
};

export default CharacterNetwork;