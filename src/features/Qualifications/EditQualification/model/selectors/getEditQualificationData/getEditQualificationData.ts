import { StateSchema } from 'app/providers/StoreProvider';

export const getEditQualificationData = (state: StateSchema) => state.editQualification?.data;
