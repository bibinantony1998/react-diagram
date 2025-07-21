import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Toolbar from './Toolbar';
import DiagramArea from './DiagramArea';

interface FlowChartProps {
  popoverContent?: (shapeId: string) => React.ReactNode;
}

const FlowChart: React.FC<FlowChartProps> = ({ popoverContent }) => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ display: 'flex', height: '100vh' }}>
        <Toolbar />
        <DiagramArea popoverContent={popoverContent} />
      </div>
    </DndProvider>
  );
};

export default FlowChart;
