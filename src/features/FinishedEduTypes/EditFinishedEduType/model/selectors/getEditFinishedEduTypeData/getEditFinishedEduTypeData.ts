import { StateSchema } from 'app/providers/StoreProvider';

export const getEditFinishedEduTypeData = (state: StateSchema) => state.editFinishedEduType?.data;
