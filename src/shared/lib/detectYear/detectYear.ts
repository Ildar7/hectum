import { format } from 'date-fns';

export const detectYear = (year: number) => +(format(new Date(), 'dd.MM.yyyy').split('.')[2]) - year;
