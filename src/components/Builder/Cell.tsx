import {  CellGroupType, CellType } from '../../utils/types'
import { useGlobalContext } from '../../context/GlobalContext'
import cn from 'classnames'
import React from 'react';
import { Popup } from '../Popup';
import { CellMenu } from './CellMenu';
import debounce from '../../hooks/debounce';

export const Cell = ({id, rowId, groupId, isTitle = false }: CellType & {rowId: string, groupId: string}) => {
    const {
        cellGroups, setCellGroups,
        currentGroup,
        currentPos, setCurrentPos,
     } = useGlobalContext();
    const [cellValue, setCellValue] = React.useState("");
    const [isOpenPopup, setIsOpenPopup] = React.useState(false);
    const cellRef = React.useRef<HTMLInputElement>(null);

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        const regex = /^[0-9\b]+$/;

        if(isTitle) {
            setCellValue(value);
        }
        else {
            if(value === "" || regex.test(value)) {
                setCellValue(value);
                handleCellValueChange(value, cellGroups)

            }
        }
    }

    const handleCellValueChange = React.useMemo(() => {
        return debounce((value: string, groups: {[key: string]: CellGroupType}) => {
            const newCells = groups[groupId].rows[rowId].cells.map(
                (cell, index) => id - 1 === index ? { id: id, value: value} : cell 
            );

            setCellGroups(prev => ({
                ...prev,
                [groupId]: {
                    ...prev[groupId],
                    rows: {
                        ...prev[groupId].rows,
                        [rowId]: {
                            ...prev[groupId].rows[rowId],
                            cells: newCells
                        }
                    }
                }
            }))
        }, 500)
    }, [])

    const handleOpenPopup = (event: React.MouseEvent) => {
        event.preventDefault();
        setIsOpenPopup(true);
    }

    const handleClosePopup = () => {
        setIsOpenPopup(false);
    }
    
    React.useEffect(() => {
        if(id === currentPos.cellId && rowId === currentPos.rowId && groupId === currentGroup)
            cellRef.current?.focus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[currentPos])

    return (
        <td className={cn("relative h-10 w-32 max-w-32 border-2 hover:border-indigo-500/100 hover:bg-slate-300 group/title cursor-cell", (id === currentPos?.cellId && rowId === currentPos.rowId && groupId === currentGroup) ? "border-indigo-500/100" : "border-indigo-500/50")}
            onClick={() => {setCurrentPos({cellId: id, rowId: rowId, groupId: groupId})}}
            onContextMenu={handleOpenPopup}
            onBlur={handleClosePopup}
        >
            {
                isOpenPopup && 
                    <Popup onClick={handleClosePopup}>
                        <CellMenu groupId={groupId} rowId={rowId} />
                    </Popup>
            }
            <input ref={cellRef}
                   className={cn("w-full h-full outline-none border-none",
                                (cellValue !== "" ? "caret-current" : "caret-transparent"),
                                (id === currentPos?.cellId && rowId === currentPos.rowId && groupId === currentGroup) ? "pointer-events-auto" : "pointer-events-none")}
                   onChange={handleOnChange}
                   value={cellValue} 
            />
        </td>
    )
}
