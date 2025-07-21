import React from 'react';

interface PopoverProps {
  shapeId: string;
  x: number;
  y: number;
  content: React.ReactNode;
  onClose: () => void;
}

const Popover: React.FC<PopoverProps> = ({ shapeId, x, y, content, onClose }) => {
  return (
    <div
      style={{
        position: 'absolute',
        left: x + 130, // Position to the right of the shape
        top: y,
        width: '150px',
        background: 'white',
        border: '1px solid #ccc',
        padding: '10px',
        zIndex: 1000,
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {content}
    </div>
  );
};

export default Popover;
