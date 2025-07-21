import React, { useState, useCallback } from 'react';
import { useDrop } from 'react-dnd';
import { nanoid } from 'nanoid';
import Shape from './Shape';
import Xarrow, { Xwrapper } from 'react-xarrows';
import Popover from './Popover';

interface ShapeData {
  id: string;
  type: string;
  x: number;
  y: number;
  text: string;
}

interface LineData {
  id: string;
  start: string;
  end: string;
}

interface DiagramAreaProps {
  popoverContent?: (shapeId: string) => React.ReactNode;
}

const DiagramArea: React.FC<DiagramAreaProps> = ({ popoverContent }) => {
  const [shapes, setShapes] = useState<ShapeData[]>([]);
  const [lines, setLines] = useState<LineData[]>([]);
  const [selectedShape, setSelectedShape] = useState<ShapeData | null>(null);

  const moveShape = useCallback(
    (id: string, x: number, y: number) => {
      setShapes((prevShapes) =>
        prevShapes.map((shape) =>
          shape.id === id ? { ...shape, x, y } : shape
        )
      );
    },
    []
  );

  const handleTextChange = useCallback((id: string, text: string) => {
    setShapes((prevShapes) =>
      prevShapes.map((shape) =>
        shape.id === id ? { ...shape, text } : shape
      )
    );
  }, []);

  const addLine = (start: string, end: string) => {
    setLines([...lines, { id: nanoid(), start, end }]);
  };

  const [startLine, setStartLine] = useState<string | null>(null);

  const handleStartConnection = (startId: string) => {
    setStartLine(startId);
  };

  const handleEndConnection = (endId: string) => {
    if (startLine) {
      addLine(startLine, endId);
    }
    setStartLine(null);
  };

  const handleShapeClick = (shape: ShapeData) => {
    setSelectedShape(shape);
  };

  const [, drop] = useDrop(() => ({
    accept: 'shape',
    drop: (item: { type: string; id?: string }, monitor) => {
      const delta = monitor.getDifferenceFromInitialOffset();
      const offset = monitor.getClientOffset();

      if (!delta || !offset) {
        return;
      }

      if (item.id) {
        const shape = shapes.find((s) => s.id === item.id);
        if (shape) {
          moveShape(item.id, shape.x + delta.x, shape.y + delta.y);
        }
      } else {
        const newShape: ShapeData = {
          id: nanoid(),
          type: item.type,
          x: offset.x - 200,
          y: offset.y,
          text: 'Text',
        };
        setShapes((prevShapes) => [...prevShapes, newShape]);
      }
    },
  }));

  return (
    <div
      ref={drop}
      style={{
        flexBasis: '100%',
        border: '1px solid black',
        position: 'relative',
      }}
      onClick={() => setSelectedShape(null)}
    >
      <Xwrapper>
        {shapes.map((shape) => (
          <div key={shape.id} onContextMenu={(e) => { e.preventDefault(); e.stopPropagation(); handleShapeClick(shape); }}>
            <Shape
              {...shape}
              onMove={moveShape}
              onTextChange={handleTextChange}
              onStartConnection={handleStartConnection}
              onEndConnection={handleEndConnection}
            />
          </div>
        ))}
        {lines.map((line) => (
          <Xarrow
            key={line.id}
            start={line.start}
            end={line.end}
          />
        ))}
      </Xwrapper>
      {selectedShape && (
        <Popover
          shapeId={selectedShape.id}
          x={selectedShape.x}
          y={selectedShape.y}
          onClose={() => setSelectedShape(null)}
          content={popoverContent ? popoverContent(selectedShape.id) : <div>Popover for {selectedShape.type}</div>}
        />
      )}
    </div>
  );
};

export default DiagramArea;
