import { pbkdf2Sync } from 'node:crypto';

const API_KEY = '1234';

export const generatePassword = (password: string) => {
  return pbkdf2Sync(password, API_KEY, 2, 64, 'sha256');
};

export const verifyPassword = (password: string, hashPassword: string) => {
  const hash = generatePassword(password).toString();
  return hash === hashPassword;
};
