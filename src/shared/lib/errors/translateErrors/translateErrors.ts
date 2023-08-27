export const translateErrors = (error: string | undefined) => {
    switch (error) {
    case 'Email must be unique':
        return 'Пользователь с таким e-mail уже существует!';
    case 'login must be unique':
        return 'Пользователь с таким логином уже существует!';
    case 'Invalid Credentials':
        return 'Неправильный пароль!';
    case 'User not found':
        return 'Пользователь с таким логином не найден';
    case 'Invalid Token':
        return 'Сессия истекла, требуется повторный вход в систему';
    default:
        return 'Введите корректные данные';
    }
};
