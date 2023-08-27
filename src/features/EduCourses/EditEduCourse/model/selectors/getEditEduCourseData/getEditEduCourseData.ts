import { StateSchema } from 'app/providers/StoreProvider';

export const getEditEduCourseData = (state: StateSchema) => state.editEduCourse?.data;
