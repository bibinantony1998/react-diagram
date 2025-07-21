import React, { MouseEvent } from 'react';

interface ConnectionPointProps {
  shapeId: string;
  position: 'top' | 'bottom' | 'left' | 'right';
  onMouseDown: (e: MouseEvent<HTMLDivElement>) => void;
  onMouseUp: (e: MouseEvent<HTMLDivElement>) => void;
}

const ConnectionPoint: React.FC<ConnectionPointProps> = ({ shapeId, position, onMouseDown, onMouseUp }) => {
  const getPositionStyle = () => {
    switch (position) {
      case 'top':
        return { top: '-5px', left: '50%', transform: 'translateX(-50%)' };
      case 'bottom':
        return { bottom: '-5px', left: '50%', transform: 'translateX(-50%)' };
      case 'left':
        return { left: '-5px', top: '50%', transform: 'translateY(-50%)' };
      case 'right':
        return { right: '-5px', top: '50%', transform: 'translateY(-50%)' };
    }
  };

  return (
    <div
      style={{
        position: 'absolute',
        width: '10px',
        height: '10px',
        borderRadius: '50%',
        background: 'blue',
        cursor: 'crosshair',
        ...getPositionStyle(),
      }}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
    ></div>
  );
};

export default ConnectionPoint;
