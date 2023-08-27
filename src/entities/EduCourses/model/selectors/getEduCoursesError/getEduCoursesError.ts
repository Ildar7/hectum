import { StateSchema } from 'app/providers/StoreProvider';

export const getEduCoursesError = (state: StateSchema) => state.eduCourses?.error;
