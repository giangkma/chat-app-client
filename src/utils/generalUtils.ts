interface ObjectWithId {
    _id: string | number;
}

export const getElementById = (
    id: string | number,
    array: ObjectWithId[],
): any => {
    return array.find(item => item._id === id) ?? {};
};

// export const removeElementWithId = <T extends ObjectWithId>(
//     _id:string | number,
//     array: T[],
// ): T[] => {
//     return R.reject(o => o._id == id, array);
// };

export const swapArrayElements = <T>(
    arr: Array<T>,
    firstIndex: number,
    secondIndex: number,
): Array<T> => {
    [arr[firstIndex], arr[secondIndex]] = [arr[secondIndex], arr[firstIndex]];

    return arr;
};
