// Simple authentication utility
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'HackerTroupe2025!';

export const authenticateAdmin = (username: string, password: string): boolean => {
  return username === ADMIN_USERNAME && password === ADMIN_PASSWORD;
};

export const isAdminLoggedIn = (): boolean => {
  return localStorage.getItem('adminAuth') === 'true';
};

export const setAdminAuth = (isAuth: boolean): void => {
  if (isAuth) {
    localStorage.setItem('adminAuth', 'true');
  } else {
    localStorage.removeItem('adminAuth');
  }
};

export const logoutAdmin = (): void => {
  localStorage.removeItem('adminAuth');
};
