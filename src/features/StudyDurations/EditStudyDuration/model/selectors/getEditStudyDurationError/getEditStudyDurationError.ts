import { StateSchema } from 'app/providers/StoreProvider';

export const getEditStudyDurationError = (state: StateSchema) => state.editStudyDuration?.errors;
