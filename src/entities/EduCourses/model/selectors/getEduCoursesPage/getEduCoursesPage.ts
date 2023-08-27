import { StateSchema } from 'app/providers/StoreProvider';

export const getEduCoursesPage = (state: StateSchema) => state.eduCourses?.page;
