export { addCitizenship } from './model/services/addCitizenship/addCitizenship';

export {
    getAddCitizenshipName,
} from './model/selectors/getAddCitizenshipName/getAddCitizenshipName';
export {
    getAddCitizenshipIsLoading,
} from './model/selectors/getAddCitizenshipIsLoading/getAddCitizenshipIsLoading';
export {
    getAddCitizenshipError,
} from './model/selectors/getAddCitizenshipError/getAddCitizenshipError';
export {
    getAddCitizenshipCountryId,
} from './model/selectors/getAddCitizenshipCountryId/getAddCitizenshipCountryId';

export { AddCitizenship } from './ui/AddCitizenship';

export { addCitizenshipActions, addCitizenshipReducer } from './model/slice/addCitizenshipSlice';

export { AddCitizenshipSchema } from './model/types/addCitizenship';
