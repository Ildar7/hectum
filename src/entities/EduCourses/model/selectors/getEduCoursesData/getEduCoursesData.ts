import { StateSchema } from 'app/providers/StoreProvider';

export const getEduCoursesData = (state: StateSchema) => state.eduCourses?.data;
