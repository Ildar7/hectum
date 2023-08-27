import { StateSchema } from 'app/providers/StoreProvider';

export const getFinishedEduTypesIsLoading = (state: StateSchema) => state.finishedEduTypes?.isLoading;
