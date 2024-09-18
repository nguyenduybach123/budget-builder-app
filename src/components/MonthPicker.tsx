import { useGlobalContext } from "../context/GlobalContext";
import { monthValues } from "../utils/constants";

const months = [1,2,3,4,5,6,7,8,9,10,11,12];

const NUMBER_OF_MONTHS = 12;

export const MonthPicker = ({isStart = false, onPicker}: {isStart?: boolean, onPicker: (value: string) => void}) => {
  const { startMonth } = useGlobalContext();

  const handleOnPicker = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onPicker(event.target.value);
  }

  return (
    <div>
        <select className="py-2 px-4 rounded-md" onChange={handleOnPicker} >
            {
              (isStart) ?
                months.map(month => {
                    return (
                      <option value={month}>{monthValues[month]}</option>
                    )
                })
              :
                months.map(month => {
                  if(month >= startMonth && month <= NUMBER_OF_MONTHS)
                    return (
                      <option value={month}>{monthValues[month]}</option>
                    )
                })
            }
        </select>
    </div>
  )
}
