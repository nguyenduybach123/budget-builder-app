import { CellType } from "./types";

export const initalCells: Array<CellType> = [];
for (let i = 1; i <= 12; i++) {
    initalCells.push({
        id: i,
        value: ""
    });
}

export const monthValues: { [key: number]: string } = {
    1: 'Jan',
    2: 'Feb',
    3: 'Mar',
    4: 'Apr',
    5: 'May',
    6: 'Jun',
    7: 'Jul',
    8: 'Aug',
    9: 'Sep',
    10: 'Oct',
    11: 'Nov',
    12: 'Dec',
};


