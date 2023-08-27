import { StateSchema } from 'app/providers/StoreProvider';

export const getAddEduCourseTitle = (state: StateSchema) => state.addEduCourse?.data.title;
