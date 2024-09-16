import React from 'react'
import { CaretRightIcon } from '../Icon'
import { CellRow } from './CellRow'
import { useGlobalContext } from '../../context/GlobalContext'
import { Droppable } from 'react-beautiful-dnd'

export const CellGroup = ({ id }:{id: string}) => {
    const { cellGroups } = useGlobalContext();

    const cellRows =[...cellGroups[id].rowIds];

    
    return (
        <div className="relative">
            <div className="group/container">
                <h3>Income</h3>
                <CaretRightIcon className="hidden group-hover/container:block absolute top-0 left-0" />
            </div>
            <Droppable droppableId={id}>
                {
                    (provided) =>
                        <table className="w-full border-separate border-2 border-slate-400 "
                               {...provided.droppableProps}
                               ref={provided.innerRef}
                        >
                            {
                                cellRows.map(row => (
                                    <CellRow key={row} id={cellGroups[id].rows[row].id} cells={cellGroups[id].rows[row].cells}  />
                                ))
                            }
                            {provided.placeholder}
                        </table>
                }
            </Droppable>
        </div>
    )
}
