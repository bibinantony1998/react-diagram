import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Popover from '../Popover';

describe('Popover', () => {
  it('renders the popover with the correct content', () => {
    render(
      <Popover
        shapeId="shape_1"
        x={0}
        y={0}
        content={<div>Hello</div>}
        onClose={() => {}}
      />
    );
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});
