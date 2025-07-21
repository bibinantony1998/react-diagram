import React, { useState } from 'react';
import { useDrag } from 'react-dnd';
import ConnectionPoint from './ConnectionPoint';

interface ShapeProps {
  id: string;
  shape: string;
  x: number;
  y: number;
  text: string;
  onMove: (id: string, x: number, y: number) => void;
  onTextChange: (id: string, text: string) => void;
  onStartConnection: (shapeId: string, position: 'top' | 'bottom' | 'left' | 'right') => void;
  onEndConnection: (shapeId: string) => void;
}

const Shape: React.FC<ShapeProps> = ({ id, shape, x, y, text, onMove, onTextChange, onStartConnection, onEndConnection }) => {
  const [showConnectionPoints, setShowConnectionPoints] = useState(false);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'shape',
    item: { id, shape, x, y },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const getShapeStyle = () => {
    return {
      position: 'absolute',
      left: x,
      top: y,
      opacity: isDragging ? 0.5 : 1,
      cursor: 'move',
    };
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onTextChange(id, e.target.value);
  };

  const style = getShapeStyle();

  return (
    <div
      ref={drag}
      style={style}
      onMouseEnter={() => setShowConnectionPoints(true)}
      onMouseLeave={() => setShowConnectionPoints(false)}
      id={id}
    >
      <svg width="120" height="100">
        {shape === 'rectangle' && <rect width="120" height="70" style={{ fill: '#ecf0f1', stroke: '#3498db', strokeWidth: 2 }} />}
        {shape === 'circle' && <circle cx="60" cy="50" r="45" style={{ fill: '#ecf0f1', stroke: '#e74c3c', strokeWidth: 2 }} />}
        {shape === 'diamond' && <polygon points="60,0 120,50 60,100 0,50" style={{ fill: '#ecf0f1', stroke: '#f1c40f', strokeWidth: 2 }} />}
        <foreignObject x="10" y="10" width="100" height="80">
          <textarea
            value={text}
            onChange={handleTextChange}
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
              textAlign: 'center',
              background: 'transparent',
              resize: 'none',
              outline: 'none',
            }}
          />
        </foreignObject>
      </svg>
      {showConnectionPoints && (
        <>
          <ConnectionPoint shapeId={id} position="top" onMouseDown={(e) => { e.stopPropagation(); if (e.button === 0) onStartConnection(id, 'top'); }} onMouseUp={(e) => { e.stopPropagation(); if (e.button === 0) onEndConnection(id, 'top'); }} />
          <ConnectionPoint shapeId={id} position="bottom" onMouseDown={(e) => { e.stopPropagation(); if (e.button === 0) onStartConnection(id, 'bottom'); }} onMouseUp={(e) => { e.stopPropagation(); if (e.button === 0) onEndConnection(id, 'bottom'); }} />
          <ConnectionPoint shapeId={id} position="left" onMouseDown={(e) => { e.stopPropagation(); if (e.button === 0) onStartConnection(id, 'left'); }} onMouseUp={(e) => { e.stopPropagation(); if (e.button === 0) onEndConnection(id, 'left'); }} />
          <ConnectionPoint shapeId={id} position="right" onMouseDown={(e) => { e.stopPropagation(); if (e.button === 0) onStartConnection(id, 'right'); }} onMouseUp={(e) => { e.stopPropagation(); if (e.button === 0) onEndConnection(id, 'right'); }} />
        </>
      )}
    </div>
  );
};

export default Shape;
