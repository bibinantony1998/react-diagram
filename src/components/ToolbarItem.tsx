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
      {item.name}
    </div>
  );
};

export default ToolbarItem;
