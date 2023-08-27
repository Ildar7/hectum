import { StateSchema } from 'app/providers/StoreProvider';

export const getAddFinishedEduTypeIsLoading = (state: StateSchema) => state.addFinishedEduType?.isLoading;
