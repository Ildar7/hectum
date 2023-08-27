import { StateSchema } from 'app/providers/StoreProvider';

export const getEditEnrollmentTypeData = (state: StateSchema) => state.editEnrollmentType?.data;
