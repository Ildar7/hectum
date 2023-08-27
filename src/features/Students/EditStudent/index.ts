export {
    getEditStudentNewFieldsData,
} from './model/selectors/getEditStudentNewFieldsData/getEditStudentNewFieldsData';

export { editStudent } from './model/services/editStudent/editStudent';

export { editStudentActions, editStudentReducer } from './model/slice/editStudentSlice';

export { EditStudentSchema, EditStudentType, EditStudentErrors } from './model/types/editStudent';

export { EditStudent } from './ui/EditStudent';
