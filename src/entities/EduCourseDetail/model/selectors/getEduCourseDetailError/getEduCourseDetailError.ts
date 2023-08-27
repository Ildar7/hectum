import { StateSchema } from 'app/providers/StoreProvider';

export const getEduCourseDetailError = (state: StateSchema) => state.eduCourseDetail?.error;
