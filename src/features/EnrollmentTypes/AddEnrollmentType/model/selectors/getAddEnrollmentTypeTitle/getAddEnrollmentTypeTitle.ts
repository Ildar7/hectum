import { StateSchema } from 'app/providers/StoreProvider';

export const getAddEnrollmentTypeTitle = (state: StateSchema) => state.addEnrollmentType?.data.title;
