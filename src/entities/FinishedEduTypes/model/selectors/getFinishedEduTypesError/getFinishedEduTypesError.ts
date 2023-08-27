import { StateSchema } from 'app/providers/StoreProvider';

export const getFinishedEduTypesError = (state: StateSchema) => state.finishedEduTypes?.error;
