import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import FlowChart from '../FlowChart';

describe('FlowChart', () => {
  it('renders the toolbar and diagram area', () => {
    render(<FlowChart />);
    expect(screen.getByText('Shapes')).toBeInTheDocument();
    expect(screen.getByText('Lines')).toBeInTheDocument();
  });

  it('renders custom popover content', () => {
    const popoverContent = (shapeId: string) => <div>Custom content for {shapeId}</div>;
    render(<FlowChart popoverContent={popoverContent} />);
    // This test is incomplete as we need to trigger the popover first.
    // We will complete this test in the DiagramArea tests.
  });
});
