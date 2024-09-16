import React from 'react'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import { useGlobalContext } from '../../context/GlobalContext'
import { CellGroup } from './CellGroup';

export const TableCell = () => {
  const { groupIds } = useGlobalContext();
  
  const handleOnDragEnd = (result: DropResult) => {
    console.log(result)
  }
  
  return (
    <DragDropContext onDragEnd={handleOnDragEnd}
                     onDragStart={() => {console.log("Drag")}}
    >
      <div className="">
        {
          groupIds.map(group => (
            <CellGroup key={group} id={group} />
          ))
        }
      </div>
    </DragDropContext>
  )
}
