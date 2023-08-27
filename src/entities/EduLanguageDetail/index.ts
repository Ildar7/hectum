export {
    getEduLanguageDetailError,
} from './model/selectors/getEduLanguageDetailError/getEduLanguageDetailError';
export {
    getEduLanguageDetailIsLoading,
} from './model/selectors/getEduLanguageDetailIsLoading/getEduLanguageDetailIsLoading';
export {
    getEduLanguageDetailData,
} from './model/selectors/getEduLanguageDetailData/getEduLanguageDetailData';
export {
    fetchEduLanguageDetail,
} from './model/services/fetchEduLanguageDetail/fetchEduLanguageDetail';

export { eduLanguageDetailActions, eduLanguageDetailReducer } from './model/slice/eduLanguageDetailSlice';

export { EduLanguageDetailSchema, EduLanguageDetailType } from './model/types/eduLanguageDetail';
