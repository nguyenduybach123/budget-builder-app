import { MonthPicker } from './MonthPicker'
import { initalCells } from '../utils/constants';
import logoImg from '../assets/1607071195991927-w200.webp'
import { useGlobalContext } from '../context/GlobalContext';

export const Header = () => {
  const { setStartMonth,
          endMonth, setEndMonth,
          setCellGroups,
          setTotalGroups,
          groupIds, setGroupIds
        } = useGlobalContext();

  const handleStartPicker = (value: string) => {
    const pickerValue = parseInt(value);

    if(!pickerValue)
      return;

    if(pickerValue > endMonth)
      return;

    setStartMonth(pickerValue);
  }

  const handleEndPicker = (value: string) => {
    const pickerValue = parseInt(value);

    if(!pickerValue)
      return;

    setEndMonth(pickerValue);
  }

  const handleAddCellGroup = () => {
    const newGroupId = "group-" + (groupIds.length + 1);


    setGroupIds(prev => [...prev, newGroupId]);

    setTotalGroups(prev => ({
      ...prev,
      [newGroupId]: {
        totalColumns: []
    }
    }));

    setCellGroups(prev => ({
      ...prev,
      [newGroupId]: {
        id: newGroupId,
        title: newGroupId,
        rowIds: ['row-1'],
        rows: {
          'row-1': {
                id: 'row-1',
                cells: initalCells
            }
        }
      }
    }))

  }

  return (
    <div className="w-auto bg-slate-500 p-2">
        <div className="flex justify-between">
            <div className='flex justify-center items-center'>
                <img src={logoImg} width={60} height={60} />
            </div>
            <div className="flex justify-between items-center">
                <button type="button" className="h-10 text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm mt-4 mr-5 p-2 text-center"
                        onClick={handleAddCellGroup}
                >
                  Thêm Bảng
                </button>
                <div className="mb-1">
                  <h3 className="text-white">Start</h3>
                  <MonthPicker isStart onPicker={handleStartPicker} />
                </div>
                <div className="ml-4 mb-1">
                  <h3 className="text-white">End</h3>
                  <MonthPicker onPicker={handleEndPicker} />
                </div>
            </div>
        </div>
    </div>
  )
}
