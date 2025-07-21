import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ToolbarItem from '../ToolbarItem';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

describe('ToolbarItem', () => {
  it('renders the toolbar item with the correct name', () => {
    const item = { id: 'shape_1', shape: 'rectangle', name: 'Rectangle' };
    render(
      <DndProvider backend={HTML5Backend}>
        <ToolbarItem item={item} />
      </DndProvider>
    );
    expect(screen.getByText('Rectangle')).toBeInTheDocument();
  });
});
