import React from 'react'

const months = [
   "Jan",
   "Feb",
   "Mar",
   "Apr",
   "May",
   "Jun",
   "Jul",
   "Aug",
   "Sep",
   "Oct",
   "Nov",
   "Dec"
];

export const MonthPicker = () => {
  return (
    <div>
        <select>
            {
                months.map(month => (
                    <option>{month}</option>
                ))
            }
        </select>
    </div>
  )
}
