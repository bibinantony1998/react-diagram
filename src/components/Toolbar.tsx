import React from 'react';
import toolbarItems from '../toolbar-items.json';
import ToolbarItem from './ToolbarItem';

const Toolbar: React.FC = () => {
  return (
    <div style={{ width: '200px', borderRight: '1px solid black', padding: '10px' }}>
      <h3>Shapes</h3>
      {toolbarItems.shapes.map((item) => (
        <ToolbarItem key={item.id} item={item} />
      ))}
      <h3>Lines</h3>
      {toolbarItems.lines.map((item) => (
        <ToolbarItem key={item.id} item={item} />
      ))}
    </div>
  );
};

export default Toolbar;
