import { StateSchema } from 'app/providers/StoreProvider';

export const getEditQualificationNewFieldsData = (state: StateSchema) => state.editQualification?.newFields;
