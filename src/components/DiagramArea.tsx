import React, { useState, useCallback, MouseEvent } from 'react';
import { useDrop } from 'react-dnd';
import { nanoid } from 'nanoid';
import Shape from './Shape';
import Line from './Line';
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
  start: { x: number; y: number };
  end: { x: number; y: number };
}

interface DiagramAreaProps {
  popoverContent?: (shapeId: string) => React.ReactNode;
}

const DiagramArea: React.FC<DiagramAreaProps> = ({ popoverContent }) => {
  const [shapes, setShapes] = useState<ShapeData[]>([]);
  const [lines, setLines] = useState<LineData[]>([]);
  const [drawingLine, setDrawingLine] = useState<LineData | null>(null);
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

  const handleStartConnection = (shapeId: string, position: 'top' | 'bottom' | 'left' | 'right') => {
    const shape = shapes.find(s => s.id === shapeId);
    if (!shape) return;

    const { x, y } = getConnectorPosition(shape, position);
    setDrawingLine({ id: shapeId, start: { x, y }, end: { x, y } });
  };

  const handleEndConnection = (shapeId: string, position: 'top' | 'bottom' | 'left' | 'right') => {
    if (drawingLine) {
      const shape = shapes.find(s => s.id === shapeId);
      if (!shape) return;

      const startShape = shapes.find(s => s.id === drawingLine.id);
      if (startShape && startShape.id === shape.id) {
        setDrawingLine(null);
        return;
      }

      const { x, y } = getConnectorPosition(shape, position);
      setLines([...lines, { ...drawingLine, end: { x, y }, id: nanoid() }]);
      setDrawingLine(null);
    }
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (drawingLine) {
      const rect = e.currentTarget.getBoundingClientRect();
      setDrawingLine({ ...drawingLine, end: { x: e.clientX - rect.left, y: e.clientY - rect.top } });
    }
  };

  const getConnectorPosition = (shape: ShapeData, position: 'top' | 'bottom' | 'left' | 'right') => {
    switch (position) {
      case 'top':
        return { x: shape.x + 60, y: shape.y };
      case 'bottom':
        return { x: shape.x + 60, y: shape.y + 70 };
      case 'left':
        return { x: shape.x, y: shape.y + 35 };
      case 'right':
        return { x: shape.x + 120, y: shape.y + 35 };
    }
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
      onMouseMove={handleMouseMove}
      onMouseUp={() => setDrawingLine(null)}
      onClick={() => setSelectedShape(null)}
    >
      {shapes.map((shape) => (
        <div key={shape.id} onContextMenu={(e) => { e.preventDefault(); e.stopPropagation(); handleShapeClick(shape); }}>
          <Shape
            id={shape.id}
            shape={shape.type}
            x={shape.x}
            y={shape.y}
            text={shape.text}
            onMove={moveShape}
            onTextChange={handleTextChange}
            onStartConnection={handleStartConnection}
            onEndConnection={handleEndConnection}
          />
        </div>
      ))}
      {lines.map((line) => (
        <Line key={line.id} x1={line.start.x} y1={line.start.y} x2={line.end.x} y2={line.end.y} />
      ))}
      {drawingLine && (
        <Line x1={drawingLine.start.x} y1={drawingLine.start.y} x2={drawingLine.end.x} y2={drawingLine.end.y} />
      )}
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
