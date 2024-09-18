import { monthValues, useGlobalContext } from "../context/GlobalContext";

const months = [1,2,3,4,5,6,7,8,9,10,11,12];

const NUMBER_OF_MONTHS = 12;

export const MonthPicker = ({isMonthPickerStart = false}: {isMonthPickerStart?: boolean}) => {
  const { startMonth, setStartMonth, setEndMonth } = useGlobalContext();

  const handleOnChangeMonth = (monthValue: string) => {
    if(isMonthPickerStart)
      setStartMonth(parseInt(monthValue, 10));
    else
      setEndMonth(parseInt(monthValue, 10));
  }

  return (
    <div>
        <select className="py-2 px-4 rounded-md" onChange={(e) => handleOnChangeMonth(e.target.value)}>
            {
              (isMonthPickerStart) ?
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
