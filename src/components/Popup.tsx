import React from 'react'

export const Popup = ({x = 0, y = 0, onClick, children }: {x: number, y: number, onClick: () => void , children: React.ReactNode}) => {
  const popupRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        onClick();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      {
        popupRef &&
        <div ref={popupRef} className="absolute bg-white rounded-md z-10"
            style={{
                boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                left: x,
                top: y
            }}
            onClick={onClick}
        >
          { children }
        </div>
      }
    </>
  );
}
