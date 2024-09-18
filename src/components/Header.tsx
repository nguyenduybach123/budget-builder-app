import { useGlobalContext } from '../context/GlobalContext';
import { MonthPicker } from './MonthPicker'

export const Header = () => {
  const { setStartMonth, setEndMonth } = useGlobalContext();

  const handleStartPicker = (value: string) => {
    const pickerValue = parseInt(value);

    if(!pickerValue)
      return;

    setStartMonth(pickerValue);
  }

  const handleEndPicker = (value: string) => {
    const pickerValue = parseInt(value);

    if(!pickerValue)
      return;

    setEndMonth(pickerValue);
  }

  return (
    <div className="bg-slate-500 p-2">
        <div className="flex justify-between">
            <div>
                Logo
            </div>
            <div className="flex justify-between">
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
