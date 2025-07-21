import React, { useState } from 'react';
import { useDrag } from 'react-dnd';
import ConnectionPoint from './ConnectionPoint';

interface ShapeProps {
  id: string;
  type: string;
  x: number;
  y: number;
  text: string;
  onMove: (id: string, x: number, y: number) => void;
  onTextChange: (id: string, text: string) => void;
  onStartConnection: (shapeId: string, position: 'top' | 'bottom' | 'left' | 'right') => void;
  onEndConnection: (shapeId: string) => void;
}

const Shape: React.FC<ShapeProps> = ({ id, type, x, y, text, onMove, onTextChange, onStartConnection, onEndConnection }) => {
  const [showConnectionPoints, setShowConnectionPoints] = useState(false);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'shape',
    item: { id, type, x, y },
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

  const renderShape = () => {
    switch (type) {
      case 'rectangle':
        return <rect width="120" height="70" style={{ fill: '#ecf0f1', stroke: '#3498db', strokeWidth: 2 }} />;
      case 'circle':
        return <circle cx="45" cy="45" r="45" style={{ fill: '#ecf0f1', stroke: '#e74c3c', strokeWidth: 2 }} />;
      case 'diamond':
        return <polygon points="50,0 100,50 50,100 0,50" style={{ fill: '#ecf0f1', stroke: '#f1c40f', strokeWidth: 2 }} />;
      default:
        return <rect width="120" height="70" style={{ fill: '#ecf0f1', stroke: 'black', strokeWidth: 2 }} />;
    }
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
    >
      <svg width="120" height="100">
        {renderShape()}
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
          <ConnectionPoint shapeId={id} position="top" onMouseDown={(e) => { if (e.button === 1) onStartConnection(id, 'top'); }} onMouseUp={(e) => { if (e.button === 1) onEndConnection(id); }} />
          <ConnectionPoint shapeId={id} position="bottom" onMouseDown={(e) => { if (e.button === 1) onStartConnection(id, 'bottom'); }} onMouseUp={(e) => { if (e.button === 1) onEndConnection(id); }} />
          <ConnectionPoint shapeId={id} position="left" onMouseDown={(e) => { if (e.button === 1) onStartConnection(id, 'left'); }} onMouseUp={(e) => { if (e.button === 1) onEndConnection(id); }} />
          <ConnectionPoint shapeId={id} position="right" onMouseDown={(e) => { if (e.button === 1) onStartConnection(id, 'right'); }} onMouseUp={(e) => { if (e.button === 1) onEndConnection(id); }} />
        </>
      )}
    </div>
  );
};

export default Shape;
