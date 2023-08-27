import { StateSchema } from 'app/providers/StoreProvider';

export const getAddEduCourseIsLoading = (state: StateSchema) => state.addEduCourse?.isLoading;
