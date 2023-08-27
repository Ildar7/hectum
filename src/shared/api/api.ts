import axios from 'axios';
import { USER_JWT_LOCALSTORAGE_KEY } from 'shared/const/localstorage';

const baseUrl = 'https://hectum-dev.kz/api';

export const $api = axios.create({
    baseURL: baseUrl,
    headers: {
        'x-access-token': localStorage.getItem(USER_JWT_LOCALSTORAGE_KEY) || '',
    },
});
