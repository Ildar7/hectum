import { AddStudentErrors } from 'features/Students/AddStudent/model/types/addStudent';
import { EditStudentErrors } from 'features/Students/EditStudent/model/types/editStudent';

export const detectInvalidInput = (
    errors: AddStudentErrors | EditStudentErrors | undefined,
    inputName: string,
) => {
    if (errors) {
        if (errors.status === 422) {
            // @ts-ignore
            const filteredError = errors?.errors?.filter((error: any) => error.path.toLowerCase() === inputName.toLowerCase());
            if (!filteredError.length) {
                return false;
            }
            return true;
        }

        if (errors.status === 500) {
            // @ts-ignore
            const filteredError = errors.errors.validation.filter((error: any) => error.field.toLowerCase() === inputName.toLowerCase());
            if (!filteredError.length) {
                return false;
            }
            return true;
        }
    }

    return false;
};
