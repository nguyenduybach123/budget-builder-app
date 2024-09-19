export type TotalGroupType = {
    totalColumns: Array<number>
}

export type CellGroupType = {
    id: string,
    title: string,
    rowIds: Array<string>,
    rows: {[key: string]: CellRowType},
}

export type CellRowType = {
    id: string,
    cells: Array<CellType>
}

export type CellType = {
    id: number,
    value: string,
    isTitle?: boolean
}

export type CellPositionType  = {
    groupId: string,
    rowId: string,
    cellId: number
}

export type IconType = {
    width?: string,
    height?: string,
    className?: string
}