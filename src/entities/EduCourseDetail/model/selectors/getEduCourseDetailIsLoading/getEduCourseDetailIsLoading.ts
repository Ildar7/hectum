import { StateSchema } from 'app/providers/StoreProvider';

export const getEduCourseDetailIsLoading = (state: StateSchema) => state.eduCourseDetail?.isLoading;
