export const renameKeys = (obj: object, newKeys: object) => {
    const keyValues = Object.keys(obj).map((key) => {
        const newKey = (newKeys as never)[key] || key;
        return { [newKey]: (obj as never)[key] };
    });
    return Object.assign({}, ...keyValues);
};

if (import.meta.hot) import.meta.hot.acceptExports('renameKeys');
