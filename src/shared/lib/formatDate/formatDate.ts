export const formatDate = (dateArr: string[] | string | undefined) => {
    if (dateArr) {
        return `${dateArr[2]}-${dateArr[1]}-${dateArr[0]}`;
    }

    return null;
};
