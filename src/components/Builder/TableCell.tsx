import React from 'react'
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd'
import { useGlobalContext } from '../../context/GlobalContext'
import { CellGroup } from './CellGroup';

export const TableCell = () => {
  const { groupIds, cellGroups, setCellGroups, currentPos, setCurrentPos } = useGlobalContext();
  const groupRef = React.useRef<HTMLDivElement>(null);

  const handleOnDragEnd = (result: DropResult) => {
    console.log(result)
    const {destination, source, draggableId } = result;

    if(!destination) {
      return;
    }
  
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    const rows = cellGroups[source.droppableId].rowIds;
    const newRowIds = [...rows];
    newRowIds.splice(source.index, 1);
    newRowIds.splice(destination.index, 0, draggableId);

    const newRow = {
      ...cellGroups[source.droppableId],
      rowIds: newRowIds
    }

    setCellGroups(prev => (
      {
        ...prev,
        [source.droppableId]: newRow
      }
    ));
  }

  const handleOnMoveCell = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const rowLength = cellGroups[currentPos.groupId].rowIds.length;
    const cellLength = 4;
    switch(event.key) {
      case 'ArrowUp':
        if(currentPos?.rowId - 1 === 0) {
          return;
        }
        setCurrentPos(prev => ({...prev, rowId: prev.rowId - 1}));
        break;
      case 'ArrowDown':
        if(currentPos?.rowId + 1 > rowLength) {
          return;
        }
        setCurrentPos(prev => ({...prev, rowId: prev.rowId + 1}));
        break;
      case 'ArrowLeft':
        if(currentPos?.cellId - 1 < 0) {
          return;
        }
        setCurrentPos(prev => ({...prev, cellId: prev.cellId - 1}));
        break;
      case 'ArrowRight':
        if(currentPos?.cellId + 1 === cellLength) {
          return;
        }
        setCurrentPos(prev => ({...prev, cellId: prev.cellId + 1}));
        break;
      default:
        break;
    }
    console.log(currentPos)
  }

  const handleOnMouseDown = () => {
      if(groupRef !== null)
          groupRef.current?.focus();
  }

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}
                     onDragStart={() => {console.log("Drag")}}
    >
      {
        groupIds.map(id => (
          <Droppable droppableId={id}>
            {
              (provided) =>
                <table className="w-full border-separate border-2 border-slate-400"
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        onKeyDown={handleOnMoveCell}
                        onMouseDown={handleOnMouseDown}
                >
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Jan</th>
                      <th>Feb</th>
                      <th>Mar</th>
                    </tr>
                  </thead>
                  {
                    groupIds.map(group => (
                      <CellGroup key={group} id={group} title='Income' />
                    ))
                  }
                  {provided.placeholder}
                </table>
            }
          </Droppable>
        ))
      }
    </DragDropContext>
  )
}
