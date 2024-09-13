import React from 'react'
import { CellPositionType, CellType } from '../../utils/constants'
import { useGlobalContext } from '../../context/GlobalContext'
import cn from 'classnames'

export const Cell = ({id, parentId, value, isTitle = false}: CellType) => {
    const { currentPos, setCurrentPos } = useGlobalContext();

    const currentId: CellPositionType = {
        cellId: id,
        parentId: parentId
    }

    
    return (
        <td className={cn("h-10 border-2  hover:border-indigo-500/100 hover:bg-slate-300 cursor-pointer", (currentId.cellId === currentPos?.cellId && currentId.parentId === currentPos.parentId) ? "border-indigo-500/100" : "border-indigo-500/50")}
            onClick={() => {setCurrentPos(currentId)}}
        >
            {value}
        </td>
    )
}
