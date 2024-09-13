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
                <MonthPicker />
                <MonthPicker />
            </div>
        </div>
    </div>
  )
}
