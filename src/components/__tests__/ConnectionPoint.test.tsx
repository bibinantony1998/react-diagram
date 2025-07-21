import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ConnectionPoint from '../ConnectionPoint';

describe('ConnectionPoint', () => {
  it('calls the onMouseDown and onMouseUp handlers', () => {
    const onMouseDown = vi.fn();
    const onMouseUp = vi.fn();
    render(
      <ConnectionPoint
        shapeId="shape_1"
        position="top"
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
      />
    );
    const connectionPoint = screen.getByRole('button'); // The connection point is a div, but we can treat it as a button for testing
    fireEvent.mouseDown(connectionPoint);
    expect(onMouseDown).toHaveBeenCalledTimes(1);
    fireEvent.mouseUp(connectionPoint);
    expect(onMouseUp).toHaveBeenCalledTimes(1);
  });
});
