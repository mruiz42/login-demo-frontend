// return the user data from the session storage
export const getUser = () => {
    const userStr = sessionStorage.getItem('user');
    if (userStr) return userStr;
    else return null;
}

// return the token from the session storage
export const isLogin = () => {
    return sessionStorage.getItem('user') || null;
}

// remove the token and user from the session storage
export const removeUserSession = () => {
    sessionStorage.removeItem('sid');
    sessionStorage.removeItem('user');
}

// set the token and user from the session storage
export const setUserSession = (session) => {
    console.log(session.username);
    sessionStorage.setItem('user', String(session.username));
}
