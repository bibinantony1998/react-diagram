import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Shape from '../Shape';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

describe('Shape', () => {
  it('renders the shape with the correct text', () => {
    const shape = { id: 'shape_1', shape: 'rectangle', x: 0, y: 0, text: 'Hello' };
    render(
      <DndProvider backend={HTML5Backend}>
        <Shape
          {...shape}
          onMove={() => {}}
          onTextChange={() => {}}
          onStartConnection={() => {}}
          onEndConnection={() => {}}
        />
      </DndProvider>
    );
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});
