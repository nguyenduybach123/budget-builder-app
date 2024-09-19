import { useGlobalContext } from '../../context/GlobalContext';
import { v4 as uuidv4 } from 'uuid';
import { CellType } from '../../utils/types';

export const CellMenu = ({groupId, rowId}: {groupId: string, rowId: string}) => {
    const { cellGroups, setCellGroups } = useGlobalContext();

    const handleDeleteRow = () => {
        if(cellGroups[groupId].rowIds.length === 1)
            return;
    
        const newRowIds = cellGroups[groupId].rowIds.filter(id => rowId !== id ? true : false);
        const newRows = Object.assign({}, cellGroups[groupId].rows);
        delete newRows[rowId];

        setCellGroups(prev => ({
            ...prev,
            [groupId]: {
                ...cellGroups[groupId],
                rowIds: newRowIds,
                rows: newRows
            }
        }));
    }

    const handleInsertRow = () => {
        const rowIndex = cellGroups[groupId].rowIds.findIndex(id => rowId === id);
        const newRowId = uuidv4();

        const newRowIds = [...cellGroups[groupId].rowIds];
        newRowIds.splice(rowIndex + 1, 0, newRowId);

        const initalCells: Array<CellType> = [];
        for (let i = 1; i <= 12; i++) {
            initalCells.push({
                id: i,
                value: ""
            });
        }

        setCellGroups(prev => ({
            ...prev,
            [groupId]: {
                ...cellGroups[groupId],
                rowIds: newRowIds,
                rows: {
                    ...cellGroups[groupId].rows,
                    [newRowId]: {
                        id: newRowId,
                        cells: initalCells
                    }
                }
            }
        }));
    }

    return (
        <ul className="min-w-32 cursor-pointer">
            <li className="py-2 px-2 rounded-t-md hover:bg-slate-400" onClick={handleDeleteRow}>Xóa hàng</li>
            <li className="py-2 px-2 hover:bg-slate-400" onClick={handleInsertRow}>Chèn hàng</li>
            <li className="py-2 px-2 rounded-b-md hover:bg-slate-400">Áp dụng tất cả</li>
        </ul>
    );
}
