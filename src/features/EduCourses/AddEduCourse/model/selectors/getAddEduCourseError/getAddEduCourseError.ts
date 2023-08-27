import { StateSchema } from 'app/providers/StoreProvider';

export const getAddEduCourseError = (state: StateSchema) => state.addEduCourse?.errors;
