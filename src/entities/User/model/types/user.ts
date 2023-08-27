interface UsersGroup {
    'group_code': string,
    'name': string
}

export interface User {
    'user_id': number,
    'login': string,
    'Email': string,
    'first_name': string,
    'last_name': string | null,
    'patronymic': string | null,
    'group': string,
    'createdAt': string,
    'updatedAt': string,
    'users_group': UsersGroup,
    'token': string
}

export interface UserSchema {
    authData?: User;
    token?: string;
    _inited: boolean;
}
