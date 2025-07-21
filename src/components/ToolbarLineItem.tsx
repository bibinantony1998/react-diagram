import React from 'react';
import { useDrag } from 'react-dnd';

interface ToolbarLineItemProps {
  type: 'solid' | 'dashed';
  children: React.ReactNode;
}

const ToolbarLineItem: React.FC<ToolbarLineItemProps> = ({ type, children }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'line',
    item: { type },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      style={{
        padding: '8px',
        margin: '4px',
        border: '1px solid gray',
        cursor: 'move',
        opacity: isDragging ? 0.5 : 1,
      }}
    >
      {children}
    </div>
  );
};

export default ToolbarLineItem;
