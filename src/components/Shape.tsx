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
    const baseStyle = {
      position: 'absolute',
      left: x,
      top: y,
      opacity: isDragging ? 0.5 : 1,
      cursor: 'move',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    };

    switch (type) {
      case 'rectangle':
        return {
          ...baseStyle,
          width: '120px',
          height: '70px',
          border: '2px solid #3498db',
          background: '#ecf0f1',
        };
      case 'circle':
        return {
          ...baseStyle,
          width: '90px',
          height: '90px',
          border: '2px solid #e74c3c',
          borderRadius: '50%',
          background: '#ecf0f1',
        };
      case 'diamond':
        return {
          ...baseStyle,
          width: '100px',
          height: '100px',
          border: '2px solid #f1c40f',
          transform: `translate(${x}px, ${y}px) rotate(45deg)`,
          left: 0,
          top: 0,
          background: '#ecf0f1',
        };
      default:
        return {
          ...baseStyle,
          padding: '10px',
          border: '1px solid black',
        };
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
      <textarea
        value={text}
        onChange={handleTextChange}
        style={{
          width: '80%',
          height: '80%',
          border: 'none',
          textAlign: 'center',
          background: 'transparent',
          resize: 'none',
          outline: 'none',
          transform: type === 'diamond' ? 'rotate(-45deg)' : 'none',
        }}
      />
      {showConnectionPoints && (
        <>
          <ConnectionPoint shapeId={id} position="top" onMouseDown={onStartConnection} onMouseUp={onEndConnection} />
          <ConnectionPoint shapeId={id} position="bottom" onMouseDown={onStartConnection} onMouseUp={onEndConnection} />
          <ConnectionPoint shapeId={id} position="left" onMouseDown={onStartConnection} onMouseUp={onEndConnection} />
          <ConnectionPoint shapeId={id} position="right" onMouseDown={onStartConnection} onMouseUp={onEndConnection} />
        </>
      )}
    </div>
  );
};

export default Shape;
