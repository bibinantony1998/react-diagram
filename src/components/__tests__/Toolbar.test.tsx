import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Toolbar from '../Toolbar';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

describe('Toolbar', () => {
  it('renders the toolbar with shapes and lines', () => {
    render(
      <DndProvider backend={HTML5Backend}>
        <Toolbar />
      </DndProvider>
    );
    expect(screen.getByText('Shapes')).toBeInTheDocument();
    expect(screen.getByText('Lines')).toBeInTheDocument();
    expect(screen.getByText('Rectangle')).toBeInTheDocument();
    expect(screen.getByText('Circle')).toBeInTheDocument();
    expect(screen.getByText('Diamond')).toBeInTheDocument();
    expect(screen.getByText('Solid Line')).toBeInTheDocument();
    expect(screen.getByText('Dashed Line')).toBeInTheDocument();
  });
});
