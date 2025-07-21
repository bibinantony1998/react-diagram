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
  startShapeId: string;
  endShapeId: string;
  type: 'solid' | 'dashed';
  text: string;
}

interface DiagramAreaProps {
  popoverContent?: (shapeId: string) => React.ReactNode;
}

const DiagramArea: React.FC<DiagramAreaProps> = ({ popoverContent }) => {
  const [shapes, setShapes] = useState<ShapeData[]>([]);
  const [lines, setLines] = useState<LineData[]>([]);
  const [drawingLine, setDrawingLine] = useState<{ startShapeId: string; x2: number; y2: number; type: 'solid' | 'dashed' } | null>(null);
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

  const handleLineTextChange = useCallback((id: string, text: string) => {
    setLines((prevLines) =>
      prevLines.map((line) =>
        line.id === id ? { ...line, text } : line
      )
    );
  }, []);

  const handleStartConnection = (shapeId: string) => {
    const startShape = shapes.find(s => s.id === shapeId);
    if (!startShape) return;

    const center = getShapeCenter(startShape);
    setDrawingLine({
      startShapeId: shapeId,
      x2: center.x,
      y2: center.y,
      type: 'solid', // Default line type
    });
  };

  const handleEndConnection = (endShapeId: string) => {
    if (drawingLine) {
      const { startShapeId, type } = drawingLine;
      const newLine: LineData = {
        id: nanoid(),
        startShapeId,
        endShapeId,
        type,
        text: 'Edge',
      };
      setLines(prevLines => [...prevLines, newLine]);
    }
    setDrawingLine(null);
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (drawingLine) {
      const rect = e.currentTarget.getBoundingClientRect();
      setDrawingLine(prev => prev && { ...prev, x2: e.clientX - rect.left, y2: e.clientY - rect.top });
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

  const getShapeCenter = (shape: ShapeData) => {
    return {
      x: shape.x + 60, // half of width
      y: shape.y + 35, // half of height
    };
  };

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
            {...shape}
            onMove={moveShape}
            onTextChange={handleTextChange}
            onStartConnection={handleStartConnection}
            onEndConnection={handleEndConnection}
          />
        </div>
      ))}
      {selectedShape && (
        <Popover
          shapeId={selectedShape.id}
          x={selectedShape.x}
          y={selectedShape.y}
          onClose={() => setSelectedShape(null)}
          content={popoverContent ? popoverContent(selectedShape.id) : <div>Popover for {selectedShape.type}</div>}
        />
      )}
      <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
        <g>
          {lines.map(line => {
            const startShape = shapes.find(s => s.id === line.startShapeId);
            const endShape = shapes.find(s => s.id === line.endShapeId);
            if (!startShape || !endShape) return null;

            const startCenter = getShapeCenter(startShape);
            const endCenter = getShapeCenter(endShape);

            return (
              <Line
                key={line.id}
                x1={startCenter.x}
                y1={startCenter.y}
                x2={endCenter.x}
                y2={endCenter.y}
                type={line.type}
                text={line.text}
                onTextChange={(text) => handleLineTextChange(line.id, text)}
              />
            );
          })}
          {drawingLine && (() => {
            const startShape = shapes.find(s => s.id === drawingLine.startShapeId);
            if (!startShape) return null;
            const startCenter = getShapeCenter(startShape);
            return (
              <Line
                x1={startCenter.x}
                y1={startCenter.y}
                x2={drawingLine.x2}
                y2={drawingLine.y2}
                type={drawingLine.type}
              />
            );
          })()}
        </g>
      </svg>
    </div>
  );
};

export default DiagramArea;
