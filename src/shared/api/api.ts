import axios from 'axios';

const baseUrl = 'http://109.248.170.203:8080/api';

export const $api = axios.create({
    baseURL: baseUrl,
});
