import { StateSchema } from 'app/providers/StoreProvider';

export const getFinishedEduTypesPage = (state: StateSchema) => state.finishedEduTypes?.page;
