import { StateSchema } from 'app/providers/StoreProvider';

export const getEditEduCourseIsLoading = (state: StateSchema) => state.editEduCourse?.isLoading;
