import { StateSchema } from 'app/providers/StoreProvider';

export const getEditEnrollmentTypeNewFieldsData = (state: StateSchema) => state.editEnrollmentType?.newFields?.title;
