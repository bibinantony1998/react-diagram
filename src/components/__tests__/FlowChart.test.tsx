import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import FlowChart from '../FlowChart';

describe('FlowChart', () => {
  it('renders the toolbar and diagram area', () => {
    render(<FlowChart />);
    expect(screen.getByText('Toolbar')).toBeInTheDocument();
    expect(screen.getByText('Diagram Area')).toBeInTheDocument();
  });
});
