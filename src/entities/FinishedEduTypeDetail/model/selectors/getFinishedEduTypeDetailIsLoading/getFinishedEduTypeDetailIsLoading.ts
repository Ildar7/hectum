import { StateSchema } from 'app/providers/StoreProvider';

export const getFinishedEduTypeDetailIsLoading = (state: StateSchema) => state.finishedEduTypesDetail?.isLoading;
