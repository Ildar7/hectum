export const formatPhoneNumber = (phoneNumber: string | undefined) => {
    if (phoneNumber) {
        return phoneNumber.split('+')[1]
            .split(' ')
            .reduce((prev, curr) => prev + curr)
            .split('(')
            .reduce((prev, curr) => prev + curr)
            .split(')')
            .reduce((prev, curr) => prev + curr)
            .split('-')
            .reduce((prev, curr) => prev + curr)
            .replace('7', '8');
    }

    return '';
};
