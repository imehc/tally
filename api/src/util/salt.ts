import * as CryptoJS from 'crypto-js';

/**
 * 加盐
 * @returns string
 */
export const makeSalt = (): string => {
  return CryptoJS.lib.WordArray.random(16).toString(CryptoJS.enc.Base64);
};

/**
 * 不可逆加密方法
 * @returns string
 */
export const encryptWithSalt = (secret?: string, salt?: string): string => {
  if (!secret || !salt) {
    return '';
  }

  return CryptoJS.PBKDF2(secret, salt, {
    keySize: 16,
    iterations: 1000,
  }).toString(CryptoJS.enc.Base64);
};
