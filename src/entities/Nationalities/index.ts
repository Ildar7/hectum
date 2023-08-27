export { fetchNationalities } from './model/services/fetchNationalities/fetchNationalities';

export { Nationalities } from './ui/Nationalities';

export { getNationalitiesLimit } from './model/selectors/getNationalitiesLimit/getNationalitiesLimit';
export { getNationalitiesPage } from './model/selectors/getNationalitiesPage/getNationalitiesPage';

export { getNationalitiesData } from './model/selectors/getNationalitiesData/getNationalitiesData';
export { getNationalitiesError } from './model/selectors/getNationalitiesError/getNationalitiesError';
export {
    getNationalitiesIsLoading,
} from './model/selectors/getNationalitiesIsLoading/getNationalitiesIsLoading';

export { nationalitiesActions, nationalitiesReducer } from './model/slice/nationalitiesSlice';

export {
    NationalitiesSchema, NationalitiesData, NationalitiesError, NationalitiesType,
} from './model/types/nationalities';
