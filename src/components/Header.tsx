import React from 'react'
import { MonthPicker } from './MonthPicker'

export const Header = () => {
  return (
    <div className="bg-slate-500 p-2">
        <div className="flex justify-between">
            <div>
                Logo
            </div>
            <div className="flex justify-between">
                <div className="mb-1">
                  <h3 className="text-white">Start</h3>
                  <MonthPicker isMonthPickerStart />
                </div>
                <div className="ml-4 mb-1">
                  <h3 className="text-white">End</h3>
                  <MonthPicker />
                </div>
            </div>
        </div>
    </div>
  )
}
