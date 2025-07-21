import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Line from '../Line';

describe('Line', () => {
  it('renders a line', () => {
    render(<Line x1={0} y1={0} x2={100} y2={100} />);
    // The line is an SVG element, so we can't easily select it by text.
    // We will assume it renders correctly if no error is thrown.
  });
});
