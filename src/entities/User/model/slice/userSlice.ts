import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { USER_JWT_LOCALSTORAGE_KEY } from 'shared/const/localstorage';
import { User, UserSchema } from '../types/user';

const initialState: UserSchema = {
    _inited: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setAuthData: (state, action: PayloadAction<User>) => {
            state.authData = action.payload;
        },
        initAuthToken: (state) => {
            const userToken = localStorage.getItem(USER_JWT_LOCALSTORAGE_KEY);
            if (userToken) state.token = userToken;

            state._inited = true;
        },
        logout: (state) => {
            state.authData = undefined;
            state.token = undefined;
            localStorage.removeItem(USER_JWT_LOCALSTORAGE_KEY);
        },
    },
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
