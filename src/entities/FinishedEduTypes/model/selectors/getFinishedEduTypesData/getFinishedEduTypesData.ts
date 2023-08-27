import { StateSchema } from 'app/providers/StoreProvider';

export const getFinishedEduTypesData = (state: StateSchema) => state.finishedEduTypes?.data;
