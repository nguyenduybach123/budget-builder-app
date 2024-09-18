import { CellRow } from './CellRow'
import { useGlobalContext } from '../../context/GlobalContext'

export const CellGroup = ({ id, title }:{id: string, title: string}) => {
    const { cellGroups } = useGlobalContext();
    const cellRows =[...cellGroups[id].rowIds];
    return (
        <>
            <tbody>
                <tr>
                    <th>{title}</th>
                    <th></th>
                    <th></th>
                    <th></th>
                </tr>
                {
                    cellRows.map((row, index) => (
                        <CellRow key={row} id={cellGroups[id].rows[row].id} index={index} cells={cellGroups[id].rows[row].cells}  />
                    ))
                }
            </tbody>
        </>
    )
}
