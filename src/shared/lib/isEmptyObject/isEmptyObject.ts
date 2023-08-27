export const isEmptyObject = (obj: any) => {
    // eslint-disable-next-line no-restricted-syntax
    for (const prop in obj) {
        // @ts-ignore
        if (Object.hasOwn(obj, prop)) {
            return false;
        }
    }

    return true;
};
