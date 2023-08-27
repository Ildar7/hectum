import { StateSchema } from 'app/providers/StoreProvider';

export const getEditFinishedEduTypeNewFieldsData = (state: StateSchema) => state.editFinishedEduType?.newFields?.title;
