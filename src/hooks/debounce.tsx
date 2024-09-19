import { CellGroupType } from "../utils/types";

function debounce(callback: (value: string, cellGroup: {[key: string]: CellGroupType}) => void, delay: number) {
    let timeout:number | null = null;
    
    return (...args: Parameters<typeof callback>) => {
        clearTimeout(timeout ? timeout : undefined);

        timeout = setTimeout(() => {
            callback(...args)
        }, delay)
    }
}

export default debounce;