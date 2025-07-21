import React, { MouseEvent } from 'react';

interface ConnectionPointProps {
  x: number;
  y: number;
  onMouseDown: (e: MouseEvent<SVGCircleElement>) => void;
  onMouseUp: (e: MouseEvent<SVGCircleElement>) => void;
}

const ConnectionPoint: React.FC<ConnectionPointProps> = ({ x, y, onMouseDown, onMouseUp }) => {
  return (
    <circle
      cx={x}
      cy={y}
      r="5"
      fill="blue"
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      style={{ cursor: 'crosshair' }}
    />
  );
};

export default ConnectionPoint;
