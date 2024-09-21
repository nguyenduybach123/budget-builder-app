import React from 'react';
import cn from 'classnames'

import { Popup } from '../Popup';
import { CellMenu } from './CellMenu';
import debounce from '../../hooks/debounce';
import { useGlobalContext } from '../../context/GlobalContext'
import {  CellGroupType, CellType } from '../../utils/types'

export const Cell = ({id, rowId, groupId, isTitle = false }: CellType & {rowId: string, groupId: string}) => {
    const {
        cellGroups, setCellGroups,
        currentGroup,
        currentPos, setCurrentPos,
     } = useGlobalContext();
    
    const cellRef = React.useRef<HTMLTableDataCellElement>(null);
    const cellInputRef = React.useRef<HTMLInputElement>(null);
    const [cellValue, setCellValue] = React.useState("");
    const [isOpenPopup, setIsOpenPopup] = React.useState(false);
    const [posPopup, setPosPopup] = React.useState({x: 0, y: 0});

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
        setPosPopup({x: event.clientX, y: event.clientY});
        setIsOpenPopup(true);
    }

    const handleClosePopup = () => {
        setIsOpenPopup(false);
    }
    
    React.useEffect(() => {
        if(id === currentPos.cellId && rowId === currentPos.rowId && groupId === currentGroup)
            cellInputRef.current?.focus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[currentPos])

    return (
        <td className={cn("relative h-10 w-32 max-w-32 border-2 hover:border-indigo-500/100 hover:bg-slate-300 group/title cursor-cell", (id === currentPos?.cellId && rowId === currentPos.rowId && groupId === currentGroup) ? "border-4 border-indigo-500/100" : "border-indigo-500/50")}
            onClick={() => {setCurrentPos({cellId: id, rowId: rowId, groupId: groupId})}}
            onContextMenu={handleOpenPopup}
            ref={cellRef}
        >
            {
                isOpenPopup &&
                    <Popup x={posPopup.x - (cellRef.current?.getBoundingClientRect().left || 0)} 
                           y={posPopup.y - (cellRef.current?.getBoundingClientRect().top || 0)} onClick={handleClosePopup}>
                        <CellMenu groupId={groupId} rowId={rowId} />
                    </Popup>
            }
            <input ref={cellInputRef}
                   className={cn("w-full h-full px-1 outline-none border-none",
                                (cellValue !== "" ? "caret-current" : "caret-transparent"),
                                (id === currentPos?.cellId && rowId === currentPos.rowId && groupId === currentGroup) ? "pointer-events-auto" : "pointer-events-none")}
                   onChange={handleOnChange}
                   value={cellValue} 
            />
        </td>
    )
}