export {
    getCitizenshipDetailData,
} from './model/selectors/getCitizenshipDetailData/getCitizenshipDetailData';
export {
    getCitizenshipDetailError,
} from './model/selectors/getCitizenshipDetailError/getCitizenshipDetailError';
export {
    getCitizenshipDetailIsLoading,
} from './model/selectors/getCitizenshipDetailIsLoading/getCitizenshipDetailIsLoading';

export {
    fetchCitizenshipDetail,
} from './model/services/fetchCitizenshipDetail/fetchCitizenshipDetail';

export { citizenshipDetailActions, citizenshipDetailReducer } from './model/slice/citizenshipDetailSlice';

export { CitizenshipDetailSchema, CitizenshipDetailType } from './model/types/citizenshipDetail';
