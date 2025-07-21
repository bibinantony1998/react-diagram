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
  const textX = (x1 + x2) / 2;
  const textY = (y1 + y2) / 2;

  return (
    <g>
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke="black"
        strokeWidth="2"
        strokeDasharray={type === 'dashed' ? '5,5' : 'none'}
      />
      {text !== undefined && onTextChange && (
        <foreignObject x={textX - 50} y={textY - 20} width="100" height="40">
          <input
            type="text"
            value={text}
            onChange={(e) => onTextChange(e.target.value)}
            style={{
              width: '100%',
              height: '100%',
              border: '1px solid #ccc',
              textAlign: 'center',
              background: 'white',
            }}
          />
        </foreignObject>
      )}
    </g>
  );
};

export default Line;
