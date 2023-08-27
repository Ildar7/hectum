import { StateSchema } from 'app/providers/StoreProvider';

export const getFinishedEduTypeDetailError = (state: StateSchema) => state.finishedEduTypesDetail?.error;
