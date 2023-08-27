import { translateErrors } from 'shared/lib/errors/translateErrors/translateErrors';
import { AddStudentErrors } from 'features/Students/AddStudent';
import { EditStudentErrors } from 'features/Students/EditStudent';

export const setInvalidInputMessage = (
    invalid: boolean,
    errors: AddStudentErrors | EditStudentErrors | undefined,
    field: string,
) => {
    if (invalid && errors?.status === 500) {
        // @ts-ignore
        const error = errors.errors.validation.filter((item) => item.field.toLowerCase() === field.toLowerCase());
        return translateErrors(error[0].message);
    }

    switch (field) {
    case 'last_name':
        return 'Введите корректную фамилию';
    case 'first_name':
        return 'Это поле обязательно';
    case 'patronymic':
        return 'Введите корректное отчество';
    case 'login':
        return 'Введите корректный логин (мин. 4 символа)';
    case 'password':
        return 'Введите корректный пароль (мин. 8 символов)';
    case 'birth_date':
        return 'Введите корректную дату';
    case 'gender_id':
        return 'Это поле обязательно';
    case 'nationality_id':
        return 'Это поле обязательно';
    case 'citizenship_id':
        return 'Это поле обязательно';
    case 'phone_number':
        return 'Введите корректный номер телефона';
    case 'email':
        return 'Введите корректный email';
    default:
        return 'Введите корректные данные';
    }
};
