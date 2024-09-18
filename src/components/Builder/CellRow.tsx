import { CellRowType } from '../../utils/types'
import { Cell } from './Cell'
import { Draggable } from 'react-beautiful-dnd'

export const CellRow = ({ id, index, cells }: CellRowType & {index: number}) => {

  return (
    <Draggable draggableId={'row-' + id} index={index}>
      {
        (provided) => 
          <tr className="relative group/plus"
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
          >
            <Cell isTitle id={0} parentId={id} value={'Title ' +  id} />
            {
                cells?.map((cell) => (
                    <Cell key={cell.id} id={cell.id} parentId={id} value={cell.value} />
                ))
            }
          </tr>
      }
    </Draggable>
  )
}
