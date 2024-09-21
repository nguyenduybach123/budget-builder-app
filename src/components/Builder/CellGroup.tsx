import React from 'react';

import { CellRow } from './CellRow'
import { useGlobalContext } from '../../context/GlobalContext'

const months: Array<string> = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

export const CellGroup = ({ id, title }:{ id: string, title: string}) => {
    const { cellGroups, setCellGroups, 
            startMonth, endMonth,
            totalGroups, setTotalGroups,
            groupIds, setGroupIds
        } = useGlobalContext();
    const cellRows =[...cellGroups[id].rowIds];
    const [groupName, setGroupName] = React.useState(title);

    const handleDeleteCellGroup = () => {
        if(groupIds.length === 1)
            return;

        const newTotalGroups = {
            ...totalGroups
        };
        delete newTotalGroups[id];
        
        const newCellGroups = {
            ...cellGroups
        };
        delete newCellGroups[id];
        
        setGroupIds(prev => prev.filter(groupId => groupId !== id));
        setTotalGroups(newTotalGroups);
        setCellGroups(newCellGroups);
    }

    React.useEffect(() => {
        const handleGroupTotal = () => {
            const newTotalColumns: Array<number> = [];
            for(let i = startMonth; i <= endMonth; i++) {
                let total = 0;
                cellGroups[id].rowIds.forEach(rowId => {
                    if(cellGroups[id].rows[rowId].cells[i - 1].value !== "") {
                        total += parseInt(cellGroups[id].rows[rowId].cells[i - 1].value);
                    }
                })
                newTotalColumns.push(total);
            }
            
            setTotalGroups(prev => (
                {
                    ...prev,
                    [id]: {
                        totalColumns: newTotalColumns
                    }
                }
            ))
        }
        
        handleGroupTotal();
    }, [cellGroups, startMonth, endMonth])

    return (
        <>
            <tr>
                <th className="border-2 border-indigo-500/50">
                    <input className="w-full h-full text-center border-none outline-none px-1" 
                           onChange={(e) => setGroupName(e.target.value)}
                           value={groupName}
                    />
                </th>
                {
                    months.map((month, index) => {
                        if(index + 1 >= startMonth && index + 1 <= endMonth && index + 1 !== endMonth)
                            return (<th key={month}></th>)
                    })
                }
                <th colSpan={months.length - 1} className="p-1">
                    <button className="h-10 text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm p-2 text-center"
                            onClick={handleDeleteCellGroup}
                    >
                        Xóa Bảng
                    </button>
                </th>
            </tr>
            {
                cellRows.map((row, index) => (
                    <CellRow key={row} id={cellGroups[id].rows[row].id} groupId={id} index={index} cells={cellGroups[id].rows[row].cells}  />
                ))
            }
            <tr>
                <th className="p-2 border-2 border-indigo-500/50">
                    Sub Total
                </th>
                {
                    totalGroups[id].totalColumns.map((total, index) => (<th key={index} className="p-2 border-2 border-indigo-500/50">{total !== 0 ? total : ""}</th>))
                }
            </tr>
        </>
    )
}
