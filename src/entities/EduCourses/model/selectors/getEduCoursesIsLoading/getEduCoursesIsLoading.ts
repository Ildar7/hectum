import { StateSchema } from 'app/providers/StoreProvider';

export const getEduCoursesIsLoading = (state: StateSchema) => state.eduCourses?.isLoading;
