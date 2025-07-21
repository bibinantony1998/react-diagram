import React, { useState, MouseEvent } from 'react';
import ConnectionPoint from './ConnectionPoint';

interface ShapeProps {
  id: string;
  x: number;
  y: number;
  onMove: (id: string, x: number, y: number) => void;
  onStartLine: (shapeId: string, x: number, y: number) => void;
  onEndLine: (shapeId: string, x: number, y: number) => void;
  children: React.ReactNode;
}

const Shape: React.FC<ShapeProps> = ({ id, x, y, onMove, onStartLine, onEndLine, children }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [initialMousePosition, setInitialMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: MouseEvent<SVGGElement>) => {
    if (e.target instanceof SVGCircleElement) return;
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
      <ConnectionPoint x={60} y={0} onMouseDown={(e) => onStartLine(id, x + 60, y)} onMouseUp={(e) => onEndLine(id, x + 60, y)} />
      <ConnectionPoint x={120} y={35} onMouseDown={(e) => onStartLine(id, x + 120, y + 35)} onMouseUp={(e) => onEndLine(id, x + 120, y + 35)} />
      <ConnectionPoint x={60} y={70} onMouseDown={(e) => onStartLine(id, x + 60, y + 70)} onMouseUp={(e) => onEndLine(id, x + 60, y + 70)} />
      <ConnectionPoint x={0} y={35} onMouseDown={(e) => onStartLine(id, x, y + 35)} onMouseUp={(e) => onEndLine(id, x, y + 35)} />
    </g>
  );
};

export default Shape;
