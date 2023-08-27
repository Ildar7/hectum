export { fetchEduLanguages } from './model/services/fetchEduLanguages/fetchEduLanguages';

export { EduLanguages } from './ui/EduLanguages';

export { getEduLanguagesLimit } from './model/selectors/getEduLanguagesLimit/getEduLanguagesLimit';
export { getEduLanguagesPage } from './model/selectors/getEduLanguagesPage/getEduLanguagesPage';

export { getEduLanguagesData } from './model/selectors/getEduLanguagesData/getEduLanguagesData';
export { getEduLanguagesError } from './model/selectors/getEduLanguagesError/getEduLanguagesError';
export {
    getEduLanguagesIsLoading,
} from './model/selectors/getEduLanguagesIsLoading/getEduLanguagesIsLoading';

export { eduLanguagesActions, eduLanguagesReducer } from './model/slice/eduLanguagesSlice';

export {
    EduLanguagesSchema, EduLanguagesData, EduLanguagesError, EduLanguagesType,
} from './model/types/eduLanguages';
