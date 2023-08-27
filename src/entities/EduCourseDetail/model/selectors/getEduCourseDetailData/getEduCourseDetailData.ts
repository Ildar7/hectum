import { StateSchema } from 'app/providers/StoreProvider';

export const getEduCourseDetailData = (state: StateSchema) => state.eduCourseDetail?.data;
