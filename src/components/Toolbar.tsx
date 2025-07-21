import React from 'react';
import ToolbarItem from './ToolbarItem';

const Toolbar: React.FC = () => {
  const shapes = [
    { id: 'shape_1', shape: 'rectangle', name: 'Rectangle' },
    { id: 'shape_2', shape: 'circle', name: 'Circle' },
    { id: 'shape_3', shape: 'diamond', name: 'Diamond' },
  ];

  const lines = [
    { id: 'line_1', shape: 'solid', name: 'Solid Line' },
    { id: 'line_2', shape: 'dashed', name: 'Dashed Line' },
  ];

  return (
    <div style={{ width: '200px', borderRight: '1px solid black', padding: '10px' }}>
      <h3>Shapes</h3>
      {shapes.map((item) => (
        <ToolbarItem key={item.id} item={item} />
      ))}
      <h3>Lines</h3>
      {lines.map((item) => (
        <ToolbarItem key={item.id} item={item} />
      ))}
    </div>
  );
};

export default Toolbar;
