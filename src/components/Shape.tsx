import React, { useState, MouseEvent } from 'react';

interface ShapeProps {
  id: string;
  x: number;
  y: number;
  onMove: (id: string, x: number, y: number) => void;
  children: React.ReactNode;
}

const Shape: React.FC<ShapeProps> = ({ id, x, y, onMove, children }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [initialMousePosition, setInitialMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: MouseEvent<SVGGElement>) => {
    setIsDragging(true);
    setInitialMousePosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: MouseEvent<SVGGElement>) => {
    if (isDragging) {
      const dx = e.clientX - initialMousePosition.x;
      const dy = e.clientY - initialMousePosition.y;
      onMove(id, x + dx, y + dy);
      setInitialMousePosition({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <g
      transform={`translate(${x}, ${y})`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
    >
      {children}
    </g>
  );
};

export default Shape;
