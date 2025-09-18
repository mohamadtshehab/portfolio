declare module 'react-cytoscapejs' {
  import * as React from 'react';
  import type { Core, ElementDefinition, LayoutOptions } from 'cytoscape';

  export interface CytoscapeComponentProps {
    elements?: ElementDefinition[] | ElementDefinition;
    layout?: LayoutOptions;
    stylesheet?: any;
    style?: React.CSSProperties;
    className?: string;
    cy?: (cy: Core) => void;
    zoom?: number;
    minZoom?: number;
    maxZoom?: number;
    wheelSensitivity?: number;
  }

  const CytoscapeComponent: React.FC<CytoscapeComponentProps>;
  export default CytoscapeComponent;
}


