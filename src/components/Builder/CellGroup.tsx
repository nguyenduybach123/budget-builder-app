import React from 'react'
import { CaretRightIcon } from '../Icon'
import { CellRow } from './CellRow'
import { useGlobalContext } from '../../context/GlobalContext'

export const CellGroup = () => {
    const { cells } = useGlobalContext();
    
    return (
    <div className="relative">
        <div className="group/container">
            <h3>Income</h3>
            <CaretRightIcon className="hidden group-hover/container:block absolute top-0 left-0" />
        </div>
        <table className="w-full border-collapse border-2 border-slate-400 ">
            {
                cells.map((_, idx) => {
                    if((idx + 1) % 3 === 0) {
                        return (<CellRow cells={cells.slice(idx + 1 - 3, idx + 1)} isLastRow={idx == cells.length - 1} />)
                    }
                })
            }
        </table>
    </div>
    )
}
