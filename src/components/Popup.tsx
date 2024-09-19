import React from 'react'

export const Popup = ({ onClick, children }: {onClick: () => void , children: React.ReactNode}) => {
  return (
    <div className="absolute bg-white rounded-md z-10" style={{boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"}}
         onClick={onClick}
    >
      { children }
    </div>
  );
}
