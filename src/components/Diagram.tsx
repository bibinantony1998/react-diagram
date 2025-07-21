import React, { useState, MouseEvent } from 'react';
import { useDrop } from 'react-dnd';
import Shape from './Shape';
import Line from './Line';

interface ShapeData {
  id: string;
  x: number;
  y: number;
  type: 'rectangle' | 'circle' | 'diamond';
}

interface LineData {
  id: string;
  startShapeId: string;
  endShapeId: string;
  text?: string;
}

const Diagram: React.FC = () => {
  const [shapes, setShapes] = useState<ShapeData[]>([
    { id: 'shape_1', x: 100, y: 100, type: 'rectangle' },
    { id: 'shape_2', x: 300, y: 200, type: 'circle' },
    { id: 'shape_3', x: 500, y: 150, type: 'diamond' },
  ]);

  const [lines, setLines] = useState<LineData[]>([
    { id: 'line_1', startShapeId: 'shape_1', endShapeId: 'shape_2', text: 'Line 1' },
    { id: 'line_2', startShapeId: 'shape_2', endShapeId: 'shape_3' },
  ]);

  const handleMove = (id: string, x: number, y: number) => {
    setShapes(shapes.map(shape => (shape.id === id ? { ...shape, x, y } : shape)));
  };

  const getShapeCenter = (shape: ShapeData) => {
    return {
      x: shape.x + 60, // half of width
      y: shape.y + 35, // half of height
    };
  };

  const [, drop] = useDrop(() => ({
    accept: 'shape',
    drop: (item: { type: 'rectangle' | 'circle' | 'diamond' }, monitor) => {
      const offset = monitor.getClientOffset();
      if (offset) {
        const newShape: ShapeData = {
          id: `shape_${shapes.length + 1}`,
          x: offset.x - 200, // Adjust for toolbar width
          y: offset.y,
          type: item.type,
        };
        setShapes([...shapes, newShape]);
      }
    },
  }));

  const [drawingLine, setDrawingLine] = useState<{ startShapeId: string, startX: number; startY: number; endX: number; endY: number } | null>(null);

  const handleStartLine = (shapeId: string, x: number, y: number) => {
    setDrawingLine({ startShapeId: shapeId, startX: x, startY: y, endX: x, endY: y });
  };

  const handleEndLine = (shapeId: string, x: number, y: number) => {
    if (drawingLine) {
      const newLine: LineData = {
        id: `line_${lines.length + 1}`,
        startShapeId: drawingLine.startShapeId,
        endShapeId: shapeId,
      };
      setLines([...lines, newLine]);
    }
    setDrawingLine(null);
  };

  const handleMouseMove = (e: MouseEvent<SVGSVGElement>) => {
    if (drawingLine) {
      setDrawingLine({ ...drawingLine, endX: e.clientX - 200, endY: e.clientY });
    }
  };

  return (
    <svg ref={drop} width="100%" height="100vh" style={{ border: '1px solid black', marginLeft: '200px' }} onMouseMove={handleMouseMove} onMouseUp={() => setDrawingLine(null)}>
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
            text={line.text}
          />
        );
      })}
      {drawingLine && <line x1={drawingLine.startX} y1={drawingLine.startY} x2={drawingLine.endX} y2={drawingLine.endY} stroke="black" strokeWidth="2" />}
      {shapes.map(shape => (
        <Shape key={shape.id} id={shape.id} x={shape.x} y={shape.y} onMove={handleMove} onStartLine={handleStartLine} onEndLine={handleEndLine}>
          {shape.type === 'rectangle' && <rect width="120" height="70" style={{ fill: '#ecf0f1', stroke: '#3498db', strokeWidth: 2 }} />}
          {shape.type === 'circle' && <circle cx="60" cy="35" r="35" style={{ fill: '#ecf0f1', stroke: '#e74c3c', strokeWidth: 2 }} />}
          {shape.type === 'diamond' && <polygon points="60,0 120,35 60,70 0,35" style={{ fill: '#ecf0f1', stroke: '#f1c40f', strokeWidth: 2 }} />}
        </Shape>
      ))}
    </svg>
  );
};

export default Diagram;
