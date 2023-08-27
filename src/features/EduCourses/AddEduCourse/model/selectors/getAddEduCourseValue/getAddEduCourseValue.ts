import { StateSchema } from 'app/providers/StoreProvider';

export const getAddEduCourseValue = (state: StateSchema) => state.addEduCourse?.data.value;
