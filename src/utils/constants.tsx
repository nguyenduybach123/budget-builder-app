export type CellRowType = {
    isLastRow?: boolean,
    cells?: Array<CellType>
}

export type CellType = {
    id: number,
    parentId: number,
    value?: string,
    isTitle?: boolean
}

export type CellPositionType  = {
    parentId: number,
    cellId: number
}

export type IconType = {
    width?: string,
    height?: string,
    className?: string
}