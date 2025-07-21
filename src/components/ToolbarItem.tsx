import React from 'react';
import { useDrag } from 'react-dnd';

interface ToolbarItemProps {
  item: {
    id: string;
    shape: string;
    name: string;
  };
}

const ToolbarItem: React.FC<ToolbarItemProps> = ({ item }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'shape',
    item: { type: item.shape },
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
      <svg width="50" height="30">
        {item.shape === 'rectangle' && <rect width="50" height="30" style={{ fill: '#ecf0f1', stroke: '#3498db', strokeWidth: 2 }} />}
        {item.shape === 'circle' && <circle cx="25" cy="15" r="15" style={{ fill: '#ecf0f1', stroke: '#e74c3c', strokeWidth: 2 }} />}
        {item.shape === 'diamond' && <polygon points="25,0 50,15 25,30 0,15" style={{ fill: '#ecf0f1', stroke: '#f1c40f', strokeWidth: 2 }} />}
      </svg>
      <span style={{ marginLeft: '10px' }}>{item.name}</span>
    </div>
  );
};

export default ToolbarItem;
