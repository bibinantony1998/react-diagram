import FlowChart from './components/FlowChart';

function App() {
  const renderPopoverContent = (shapeId: string) => {
    return (
      <div>
        <h3>Custom Popover</h3>
        <p>This popover is for shape: {shapeId}</p>
        <button onClick={() => alert(`Button clicked for shape: ${shapeId}`)}>
          Click me
        </button>
      </div>
    );
  };

  return (
    <FlowChart popoverContent={renderPopoverContent} />
  );
}

export default App;
