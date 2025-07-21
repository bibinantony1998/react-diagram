import Diagram from './components/Diagram';
import Toolbar from './components/Toolbar';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Toolbar />
      <Diagram />
    </DndProvider>
  );
}

export default App;
