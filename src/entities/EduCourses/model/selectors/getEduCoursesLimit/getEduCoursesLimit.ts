import { StateSchema } from 'app/providers/StoreProvider';

export const getEduCoursesLimit = (state: StateSchema) => state.eduCourses?.limit;
