import {useCallback} from 'react';
import {MMKV} from 'react-native-mmkv';

export interface AuthProps {
  accessToken: string;
}

const accessTokenKey = 'ACCESS_TOKEN';
const storage = new MMKV();

/**
 * 键值对存储
 * @see https://github.com/mrousavy/react-native-mmkv
 */
export const useStorage = () => {
  const setStorageToken = useCallback((auth: AuthProps) => {
    storage.set(accessTokenKey, JSON.stringify(auth));
  }, []);

  const getStorageToken = useCallback<() => AuthProps | undefined>(() => {
    const temp = storage.getString(accessTokenKey);
    if (!temp) {
      return undefined;
    }
    return JSON.parse(temp) as AuthProps;
  }, []);

  const clearStorageToken = useCallback(() => {
    return storage.delete(accessTokenKey);
  }, []);

  return {
    setStorageToken,
    getStorageToken,
    clearStorageToken,
  };
};
