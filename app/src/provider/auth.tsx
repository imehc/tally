import {createContext, useCallback, useContext, useMemo, useState} from 'react';
import {useStorage} from '../hooks';

interface AuthContextProps {
  accessToken: string | undefined;
  setAccessToken: (token: string) => void;
  removeAccessToken: () => void;
}

const defaultProps: AuthContextProps = {
  accessToken: undefined,
  setAccessToken: () => {},
  removeAccessToken: () => {},
};

const AuthContext = createContext<AuthContextProps>(defaultProps);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const {setStorageToken, getStorageToken, clearStorageToken} = useStorage();
  const [accessToken, setAccessToken] = useState<string | undefined>(
    () => getStorageToken()?.accessToken,
  );

  const handleSetAccessToken = useCallback(
    (token?: string) => {
      if (token) {
        setStorageToken({accessToken: token});
      }
      setAccessToken(token);
    },
    [setStorageToken],
  );

  const handleRemoveAccessToken = useCallback(() => {
    clearStorageToken();
    setAccessToken(undefined);
  }, [clearStorageToken]);

  const globalValue = useMemo<AuthContextProps>(() => {
    return {
      accessToken,
      setAccessToken: handleSetAccessToken,
      removeAccessToken: handleRemoveAccessToken,
    };
  }, [accessToken, handleRemoveAccessToken, handleSetAccessToken]);
  // 可以在这里处理以token判断是否跳转到登录页
  // if(!accessToken) {
  //   // 跳转到登录页
  // }
  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <AuthContext.Provider value={globalValue}>{children}</AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error(
      'useGlobalContext must be used within a GlobalContextProvider',
    );
  }
  return context;
};

export const useAccessToken = () => {
  const {accessToken} = useAuthContext();
  return accessToken;
};
