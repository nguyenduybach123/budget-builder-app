import { Draggable } from 'react-beautiful-dnd'

import { Cell } from './Cell'
import { CellRowType } from '../../utils/types'
import { useGlobalContext } from '../../context/GlobalContext'

export const CellRow = ({ id, groupId, index, cells }: CellRowType & {index: number, groupId: string}) => {
  const {startMonth, endMonth} = useGlobalContext();

  return (
    <Draggable draggableId={id} index={index}>
      {
        (provided) => 
          <tr className="relative group/plus"
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
          >
            <Cell isTitle id={0} rowId={id} groupId={groupId} value={'Title ' +  id} />
            {
                cells?.map(cell => {
                  if(cell.id >= startMonth && cell.id <= endMonth)
                    return (
                      <Cell key={cell.id} id={cell.id} rowId={id} groupId={groupId} value={cell.value} />
                    )
                })
            }
          </tr>
      }
    </Draggable>
  )
}
