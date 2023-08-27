import { StateSchema } from 'app/providers/StoreProvider';

export const getQualificationsData = (state: StateSchema) => state.qualifications?.data;
