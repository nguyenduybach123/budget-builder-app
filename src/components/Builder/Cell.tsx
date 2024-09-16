import {  CellType } from '../../utils/types'
import { useGlobalContext } from '../../context/GlobalContext'
import cn from 'classnames'

export const Cell = ({id, parentId, value}: CellType & {parentId: number}) => {
    const { currentPos, setCurrentPos, currentGroup } = useGlobalContext();
    
    return (
        <td className={cn("h-10 border-2  hover:border-indigo-500/100 hover:bg-slate-300 cursor-pointer", (id === currentPos?.cellId && parentId === currentPos.rowId) ? "border-indigo-500/100" : "border-indigo-500/50")}
            onClick={() => {setCurrentPos({cellId: id, rowId: parentId, groupId: currentGroup})}}
        >
            {value}
        </td>
    )
}
