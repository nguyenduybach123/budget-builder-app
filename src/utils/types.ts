
export type CellGroupType = {
    id: string,
    rowIds: Array<string>,
    rows: {[key: string]: CellRowType}
}

export type CellRowType = {
    id: number,
    cells?: Array<CellType>
}

export type CellType = {
    id: number,
    value?: string,
    isTitle?: boolean
}

export type CellPositionType  = {
    groupId: string,
    rowId: number,
    cellId: number
}

export type IconType = {
    width?: string,
    height?: string,
    className?: string
}