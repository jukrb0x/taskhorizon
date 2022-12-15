export const renameKeys = (obj: any, newKeys: any) => {
    const keyValues = Object.keys(obj).map((key) => {
        const newKey = newKeys[key] || key;
        return { [newKey]: obj[key] };
    });
    return Object.assign({}, ...keyValues);
};
