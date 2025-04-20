// src/types/react-usa-map.d.ts

declare module 'react-usa-map' {
    import * as React from 'react';
  
    interface USAMapProps {
      customize?: Record<string, { fill: string }>;
      onClick?: (event: React.MouseEvent<SVGElement>) => void;
      width?: number | string;
      height?: number | string;
      style?: React.CSSProperties;
    }
  
    const USAMap: React.FC<USAMapProps>;
  
    export default USAMap;
  }