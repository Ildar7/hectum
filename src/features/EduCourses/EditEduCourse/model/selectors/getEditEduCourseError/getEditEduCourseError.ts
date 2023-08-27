import { StateSchema } from 'app/providers/StoreProvider';

export const getEditEduCourseError = (state: StateSchema) => state.editEduCourse?.errors;
