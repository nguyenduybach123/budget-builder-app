import React from 'react';

import { useGlobalContext } from '../../context/GlobalContext'

export const TableSummary = () => {
    const [totalColumnGroups, setTotalColumnGroups] = React.useState<Array<number>>([]);

    const { 
            startMonth, endMonth,
            groupIds,
            totalGroups 
        } = useGlobalContext();

    const calculateTotalColumnGroups = () => {
        const newTotalColumnGroups = [];
        for(let i = startMonth; i <= endMonth; i++) {
            let total = 0;
            groupIds.map(id => {
                total += totalGroups[id].totalColumns[i - 1];
            })
            newTotalColumnGroups.push(total);
        }

        setTotalColumnGroups(newTotalColumnGroups);
    }

    React.useEffect(() => {
        calculateTotalColumnGroups();
    },[totalGroups])
    
    return (
        <table className="w-auto border-separate border-slate-400">
            <thead></thead>
            <tbody>
                <tr className="text-red-400">
                    <th className="relative p-2 h-10 w-32 max-w-32 text-lg">Total Group</th>
                    {
                        totalColumnGroups.map(total => (total && total != 0) ? 
                            (<th className="p-2 h-10 w-32 max-w-32 text-lg">{total}</th>) : (<th className="p-2 h-10 w-32 max-w-32 text-lg"></th>)) 
                    }
                </tr>
            </tbody>
        </table>
    )
}
