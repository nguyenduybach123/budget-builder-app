import { CellRow } from './CellRow'
import { useGlobalContext } from '../../context/GlobalContext'
import React from 'react';

export const CellGroup = ({ id, title }:{ id: string, title: string}) => {
    const { cellGroups, 
            startMonth, endMonth,
            totalGroups, setTotalGroups
        } = useGlobalContext();
    const cellRows =[...cellGroups[id].rowIds];

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
                <th>{title}</th>
            </tr>
            {
                cellRows.map((row, index) => (
                    <CellRow key={row} id={cellGroups[id].rows[row].id} groupId={id} index={index} cells={cellGroups[id].rows[row].cells}  />
                ))
            }
            <tr>
                <th>
                    Sub Total
                </th>
                {
                    totalGroups[id].totalColumns.map((total, index) => (<th key={index}>{total !== 0 ? total : ""}</th>))
                }
            </tr>
        </>
    )
}
