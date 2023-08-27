import { StateSchema } from 'app/providers/StoreProvider';

export const getQualificationsError = (state: StateSchema) => state.qualifications?.error;
