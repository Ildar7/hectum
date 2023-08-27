import { StateSchema } from 'app/providers/StoreProvider';

export const getEditEduCourseNewFieldsData = (state: StateSchema) => state.editEduCourse?.newFields;
