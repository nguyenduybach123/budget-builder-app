import React from 'react'
import { Cell } from './Cell'
import { CellRowType } from '../../utils/constants'
import { PlusIcon } from '../Icon'
import { useGlobalContext } from '../../context/GlobalContext'

export const CellRow = ({cells, isLastRow = false}: CellRowType) => {
  const { setCells } = useGlobalContext();

  const handleAddRowCell = () => {
    setCells(prev => {
      return [...prev, ...prev];
    })
  }

  return (
    <tr className="relative group/plus">
        {
          isLastRow &&
          <div className="p-2 hidden group-hover/plus:inline bg-white absolute -bottom-4 -left-4 rounded-md shadow-sm border z-10 cursor-pointer"
                onClick={handleAddRowCell}
          >
            <PlusIcon />
          </div>
        }
        <Cell isTitle parentId={0} id={0} value={'Title'} />
        {
            cells?.map((cell) => (
                <Cell parentId={cell.parentId} id={cell.id} value={cell.value} />
            ))
        }
    </tr>
  )
}
