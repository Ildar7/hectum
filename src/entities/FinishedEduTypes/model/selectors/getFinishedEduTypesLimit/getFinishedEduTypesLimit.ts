import { StateSchema } from 'app/providers/StoreProvider';

export const getFinishedEduTypesLimit = (state: StateSchema) => state.finishedEduTypes?.limit;
