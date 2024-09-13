
import React from 'react'
import { CellPositionType, CellType } from '../utils/constants';

const cellsData: Array<CellType> = [
    {
        id: 1,
        parentId: 1,
        value: ""
    },
    {
        id: 2,
        parentId: 1,
        value: ""
    },
    {
        id: 3,
        parentId: 1,
        value: ""
    }
]

type GlobalContextType = {
    cells: Array<CellType>,
    setCells: React.Dispatch<React.SetStateAction<CellType[]>>,
    currentPos: CellPositionType | undefined,
    setCurrentPos:React.Dispatch<React.SetStateAction<CellPositionType | undefined>>
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
    const [cells, setCells] = React.useState<Array<CellType>>(cellsData);
    const [currentPos, setCurrentPos] = React.useState<CellPositionType>();

    return (
        <GlobalContext.Provider value={{
                                    cells, setCells,
                                    currentPos, setCurrentPos
                                }}
        >
            {children}
        </GlobalContext.Provider>
    )
}