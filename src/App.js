import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
// Absolte imports
import './App.css';

function App() {
  const [box, setBox] = useState(
    [
      {
        id: 0,
        bg: "red"
      },
      {
        id: 1,
        bg: "green"
      },
      {
        id: 2,
        bg: "blue"
      },
      {
        id: 3,
        bg: "Yellow"
      }
    ]);

  function handleOnDragEnd(result) {
    if (!result.destination) return;
    const newBox = Array.from(box);
    const [draggedItem] = newBox.splice(result.source.index, 1);
    newBox.splice(result.destination.index, 0, draggedItem);
    setBox(newBox);
  }

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable  droppableId="boxes">
        {(provided) => (
          <ul ref={provided.innerRef} {...provided.droppableProps}>
            {box.map(({ id, bg }, index) =>
              <Draggable key={id} draggableId={id.toString()} index={index}>
                {(provided) => (
                  <li ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps}>
                    <div style={{ backgroundColor: bg }} className='box'></div>
                  </li>
                )}
              </Draggable>
            )}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default App;
