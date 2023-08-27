import { StateSchema } from 'app/providers/StoreProvider';

export const getQualificationsPage = (state: StateSchema) => state.qualifications?.page;
