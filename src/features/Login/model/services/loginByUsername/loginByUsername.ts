import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { User, userActions } from 'entities/User';
import { USER_JWT_LOCALSTORAGE_KEY } from 'shared/const/localstorage';

interface LoginByUsernameProps {
    login: string;
    password: string;
}

export const loginByUsername = createAsyncThunk<User, LoginByUsernameProps, ThunkConfig<string>>(
    'login/loginByUsername',
    async (authData, thunkAPI) => {
        const { rejectWithValue, extra } = thunkAPI;

        try {
            const response = await extra.api.post<User>('/core/auth/', authData);

            if (!response.data) throw new Error();

            localStorage.setItem(USER_JWT_LOCALSTORAGE_KEY, response.data.token);

            return response.data;
        } catch (err: any) {
            return rejectWithValue(err.response.data);
        }
    },
);
