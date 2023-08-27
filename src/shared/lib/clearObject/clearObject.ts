export const clearObject = (firstObj: any, secondObj: any) => {
    const clearedObject = {};

    Object.keys(firstObj).forEach((key: string) => {
        if (firstObj[key] !== secondObj[key]) {
            // @ts-ignore
            clearedObject[key] = secondObj[key];
        }
    });

    return clearedObject;
};
