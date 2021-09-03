interface ObjectWithId {
    _id: string | number;
}

export const getElementById = (
    id: string | number,
    array: ObjectWithId[],
): any => {
    return array.find(item => item._id === id) ?? {};
};
