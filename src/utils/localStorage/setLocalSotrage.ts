/*
*
*
* */
export const setToken = (token: string) => {
    localStorage.setItem('token', token);
}
export const getToken = (): string => {
    return localStorage.getItem('token') ?? '';
}
export const removeToken = (): void => {
    localStorage.removeItem('token');
}
