
export const setUserSession = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
}
export const getUserSession = (col) => {
    // Retrieve user from localStorage
    const user = localStorage.getItem('user');
    // Handle cases where user is null, undefined, or invalid JSON
    if (!user || user === 'undefined') {
        return false;
    }
    let value;
    try {
        value = JSON.parse(user);
    } catch (error) {
        console.error('Invalid JSON in localStorage:', error);
        return false;
    }
    // If `col` is provided, return the specific key, otherwise return the full value
    if (value && col !== undefined) {
        return value[col];
    }
    return value;
}
