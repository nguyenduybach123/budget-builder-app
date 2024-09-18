import {  CellType } from '../../utils/types'
import { useGlobalContext } from '../../context/GlobalContext'
import cn from 'classnames'

export const Cell = ({id, parentId, isTitle = false, value}: CellType & {parentId: number}) => {
    const { currentPos, setCurrentPos, currentGroup } = useGlobalContext();
    console.log(isTitle)

    return (
        <td className={cn("h-10 w-32 max-w-32 border-2 hover:border-indigo-500/100 hover:bg-slate-300 cursor-pointer group/title cursor-cell", (id === currentPos?.cellId && parentId === currentPos.rowId) ? "border-indigo-500/100" : "border-indigo-500/50")}
            onClick={() => {setCurrentPos({cellId: id, rowId: parentId, groupId: currentGroup})}}
        >
            <input className={cn("w-full h-full outline-none border-none",(id === currentPos?.cellId && parentId === currentPos.rowId) ? "block" : "hidden")} value={value} />
        </td>
    )
}
