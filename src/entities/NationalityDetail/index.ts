export {
    getNationalityDetailError,
} from './model/selectors/getNationalityDetailError/getNationalityDetailError';
export {
    getNationalityDetailIsLoading,
} from './model/selectors/getNationalityDetailIsLoading/getNationalityDetailIsLoading';
export {
    getNationalityDetailData,
} from './model/selectors/getNationalityDetailData/getNationalityDetailData';
export {
    fetchNationalityDetail,
} from './model/services/fetchNationalityDetail/fetchNationalityDetail';

export { nationalityDetailActions, nationalityDetailReducer } from './model/slice/nationalityDetailSlice';

export { NationalityDetailSchema, NationalityDetailType } from './model/types/nationalityDetail';
