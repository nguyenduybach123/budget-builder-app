import { IconType } from '../utils/types'

export const CaretRightIcon = ({width = "1rem", height = "1rem", className}: IconType) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512" width={width} height={height} className={className}>
        <path d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z"/>
    </svg>
  )
}

export const PlusIcon = ({width = "1rem", height = "1rem", className}: IconType) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width={width} height={height} className={className}>
      <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"/>
    </svg>
  )
}

