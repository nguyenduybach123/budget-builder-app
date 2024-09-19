import React from 'react'
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd'
import { useGlobalContext } from '../../context/GlobalContext'
import { CellGroup } from './CellGroup';

const months: Array<string> = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

export const TableCell = () => {
  const { groupIds, 
          setCurrentGroup,
          cellGroups, setCellGroups,
          currentPos, setCurrentPos,
          startMonth, endMonth
        } = useGlobalContext();

  const groupRef = React.useRef<HTMLDivElement>(null);

  const handleOnDragEnd = (result: DropResult) => {
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
    const cellLength = endMonth - startMonth + 1;
    let currentRow: number;

    switch(event.key) {
      case 'ArrowUp':
        currentRow = cellGroups[currentPos.groupId].rowIds.findIndex(id => currentPos?.rowId === id);
        if(currentRow - 1 < 0) {
          return;
        }        
        setCurrentPos(prev => ({...prev, rowId: cellGroups[currentPos.groupId].rowIds[currentRow - 1]}));
        break;
      case 'ArrowDown':
        currentRow = cellGroups[currentPos.groupId].rowIds.findIndex(id => currentPos?.rowId === id);

        if(currentRow + 1 === rowLength) {
          return;
        }
        
        setCurrentPos(prev => ({...prev, rowId: cellGroups[currentPos.groupId].rowIds[currentRow + 1]}));
        break;
      case 'ArrowLeft':
        if(currentPos?.cellId - 1 < 0) {
          return;
        }
        setCurrentPos(prev => ({...prev, cellId: prev.cellId - 1}));
        break;
      case 'ArrowRight':
        if(currentPos?.cellId + 1 > cellLength) {
          return;
        }
        setCurrentPos(prev => ({...prev, cellId: prev.cellId + 1}));
        break;
      default:
        break;
    }
  }

  const handleOnMouseDown = () => {
      if(groupRef !== null)
          groupRef.current?.focus();
  }

  React.useEffect(() => {
  
  },[cellGroups])

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}
                     onDragStart={() => {console.log("Drag")}}
    >
      <table className="w-auto border-separate border-slate-400">
        <thead>
          <tr>
            <th>Title</th>
            {
              months.map((month, index) => {
                if(index + 1 >= startMonth && index + 1 <= endMonth)
                  return (
                    <th key={month}>{month}</th>
                  )
              })
            }
          </tr>
        </thead>
        {
          groupIds.map(id => (
              <Droppable key={id} droppableId={id}>
              {
                (provided) =>
                    <tbody  {...provided.droppableProps}
                            ref={provided.innerRef}
                            onKeyDown={handleOnMoveCell}
                            onMouseDown={handleOnMouseDown}
                            onClick={() => setCurrentGroup(id)}
                    >
                      <CellGroup id={id} title={cellGroups[id].title} />
                      {provided.placeholder}
                    </tbody>
              }
              </Droppable>
          ))
        }
      </table>
    </DragDropContext>
  )
}
