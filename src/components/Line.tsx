import React from 'react';

interface LineProps {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  type: 'solid' | 'dashed';
  text?: string;
  onTextChange?: (text: string) => void;
}

const Line: React.FC<LineProps> = ({ x1, y1, x2, y2, type, text, onTextChange }) => {
  const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const transform = `rotate(${angle}rad)`;

  const lineStyle = {
    position: 'absolute',
    transform: transform,
    width: `${length}px`,
    height: '2px',
    backgroundColor: type === 'solid' ? 'black' : 'transparent',
    borderTop: type === 'dashed' ? '2px dashed black' : 'none',
    top: `${y1}px`,
    left: `${x1}px`,
    transformOrigin: '0 0',
  };

  const textStyle = {
    position: 'absolute',
    left: `${x1 + (x2 - x1) / 2}px`,
    top: `${y1 + (y2 - y1) / 2}px`,
    transform: 'translate(-50%, -50%)',
    background: 'white',
    padding: '2px 5px',
    border: '1px solid #ccc',
  };

  return (
    <>
      <div style={lineStyle}></div>
      {text !== undefined && onTextChange && (
        <input
          type="text"
          value={text}
          onChange={(e) => onTextChange(e.target.value)}
          style={textStyle}
        />
      )}
    </>
  );
};

export default Line;
