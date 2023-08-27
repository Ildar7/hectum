export { fetchCitizenship } from './model/services/fetchCitizenship/fetchCitizenship';

export { Citizenship } from './ui/Citizenship';

export { getCitizenshipLimit } from './model/selectors/getCitizenshipLimit/getCitizenshipLimit';
export { getCitizenshipPage } from './model/selectors/getCitizenshipPage/getCitizenshipPage';

export { getCitizenshipData } from './model/selectors/getCitizenshipData/getCitizenshipData';
export { getCitizenshipError } from './model/selectors/getCitizenshipError/getCitizenshipError';
export {
    getCitizenshipIsLoading,
} from './model/selectors/getCitizenshipIsLoading/getCitizenshipIsLoading';

export { citizenshipActions, citizenshipReducer } from './model/slice/citizenshipSlice';

export {
    CitizenshipSchema, CitizenshipData, CitizenshipError, CitizenshipType,
} from './model/types/citizenship';
