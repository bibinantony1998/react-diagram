import React from 'react';
import { useDrag } from 'react-dnd';
import ToolbarLineItem from './ToolbarLineItem';

interface ToolbarItemProps {
  type: 'rectangle' | 'circle' | 'diamond';
  children: React.ReactNode;
}

const ToolbarItem: React.FC<ToolbarItemProps> = ({ type, children }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'shape',
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

const Toolbar: React.FC = () => {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '200px',
        height: '100%',
        borderRight: '1px solid black',
        padding: '10px',
      }}
    >
      <h3>Shapes</h3>
      <ToolbarItem type="rectangle">
        <svg width="50" height="30">
          <rect width="50" height="30" style={{ fill: '#ecf0f1', stroke: '#3498db', strokeWidth: 2 }} />
        </svg>
      </ToolbarItem>
      <ToolbarItem type="circle">
        <svg width="50" height="30">
          <circle cx="25" cy="15" r="15" style={{ fill: '#ecf0f1', stroke: '#e74c3c', strokeWidth: 2 }} />
        </svg>
      </ToolbarItem>
      <ToolbarItem type="diamond">
        <svg width="50" height="30">
          <polygon points="25,0 50,15 25,30 0,15" style={{ fill: '#ecf0f1', stroke: '#f1c40f', strokeWidth: 2 }} />
        </svg>
      </ToolbarItem>
      <h3>Lines</h3>
      <ToolbarLineItem type="solid">
        <svg width="50" height="10">
          <line x1="0" y1="5" x2="50" y2="5" stroke="black" strokeWidth="2" />
        </svg>
      </ToolbarLineItem>
      <ToolbarLineItem type="dashed">
        <svg width="50" height="10">
          <line x1="0" y1="5" x2="50" y2="5" stroke="black" strokeWidth="2" strokeDasharray="5,5" />
        </svg>
      </ToolbarLineItem>
    </div>
  );
};

export default Toolbar;
