import React from 'react';

interface LineProps {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  text?: string;
}

const Line: React.FC<LineProps> = ({ x1, y1, x2, y2, text }) => {
  const textX = (x1 + x2) / 2;
  const textY = (y1 + y2) / 2;

  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="black" strokeWidth="2" />
      {text && (
        <text x={textX} y={textY} fill="black" textAnchor="middle" dy="-5">
          {text}
        </text>
      )}
    </g>
  );
};

export default Line;
