
import React from 'react'
import { CellGroupType, CellPositionType, CellType } from '../utils/types';

const initalGroup = ['group-1','group-2'];

const initalCells: Array<CellType> = [];
for (let i = 1; i <= 12; i++) {
    initalCells.push({
        id: i,
        value: ""
    });
}

const groups: { [key: string]: CellGroupType } = {
    'group-1': {
        id: 'group-1',
        title: "Income",
        rowIds: ['row-1','row-2','row-3'],
        rows: {
            'row-1': {
                id: 1,
                cells: initalCells
            },
            'row-2': {
                id: 2,
                cells: initalCells
            },
            'row-3': {
                id: 3,
                cells: initalCells
            },
        }
    },
    'group-2': {
        id: 'group-2',
        title: "Outcome",
        rowIds: ['row-1','row-2','row-3'],
        rows: {
            'row-1': {
                id: 1,
                cells: initalCells
            },
            'row-2': {
                id: 2,
                cells: initalCells
            },
            'row-3': {
                id: 3,
                cells: initalCells
            },
        }
    },
}

type GlobalContextType = {
    startMonth: number,
    setStartMonth: React.Dispatch<React.SetStateAction<number>>,
    endMonth: number,
    setEndMonth: React.Dispatch<React.SetStateAction<number>>,
    currentGroup: string, 
    setCurrentGroup: React.Dispatch<React.SetStateAction<string>>,
    cellGroups: { [key: string]: CellGroupType },
    setCellGroups:  React.Dispatch<React.SetStateAction<{[key: string]: CellGroupType }>>,
    groupIds: Array<string>, 
    setGroupIds: React.Dispatch<React.SetStateAction<Array<string>>>,
    currentPos: CellPositionType,
    setCurrentPos:React.Dispatch<React.SetStateAction<CellPositionType>>
}

const GlobalContext = React.createContext<GlobalContextType | undefined>(undefined);

export const useGlobalContext = () => {
    const context = React.useContext(GlobalContext);
    if (!context) {
        throw new Error('useGlobalContext must be used within a GlobalContextProvider');
    }
    return context;
};

export const GlobalProvider = ({children}: {children: React.ReactNode}) => {
    const [startMonth, setStartMonth] = React.useState<number>(1);
    const [endMonth, setEndMonth] = React.useState<number>(1);
    const [currentGroup, setCurrentGroup] = React.useState<string>('group-1');
    const [groupIds, setGroupIds] = React.useState(initalGroup);
    const [cellGroups, setCellGroups] = React.useState<{ [key: string]: CellGroupType }>(groups)
    const [currentPos, setCurrentPos] = React.useState<CellPositionType>({groupId: 'group-1', rowId: 1, cellId: 1});

    return (
        <GlobalContext.Provider value={{
                                    startMonth, setStartMonth,
                                    endMonth, setEndMonth,
                                    currentGroup, setCurrentGroup,
                                    cellGroups, setCellGroups,
                                    groupIds, setGroupIds,
                                    currentPos, setCurrentPos
                                }}
        >
            {children}
        </GlobalContext.Provider>
    )
}