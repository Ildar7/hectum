import { StateSchema } from 'app/providers/StoreProvider';

export const getAddStudyDurationError = (state: StateSchema) => state.addStudyDuration?.errors;
