import { StudentsType } from 'entities/Students';

export const searchFilter = (searchText: string, studentsList: StudentsType[]) => {
    if (!searchText) {
        return studentsList;
    }

    return studentsList.filter(({ fio }) => (fio.toLowerCase().includes(searchText.toLowerCase())));
};
