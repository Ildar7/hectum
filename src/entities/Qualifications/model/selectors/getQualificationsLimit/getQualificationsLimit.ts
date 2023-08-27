import { StateSchema } from 'app/providers/StoreProvider';

export const getQualificationsLimit = (state: StateSchema) => state.qualifications?.limit;
