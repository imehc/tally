import {useMemo} from 'react';
import {useAccessToken} from './provider';
import {Configuration, ConfigurationParameters} from './tally-api';

export const useConfiguration = (
  config?: ConfigurationParameters,
): Configuration => {
  const accessToken = useAccessToken();
  const _config = useMemo<ConfigurationParameters>(() => {
    return {
      accessToken: accessToken ? () => accessToken : undefined,
    } as ConfigurationParameters;
  }, [accessToken]);

  return useMemo<Configuration>(() => {
    return new Configuration({..._config, ...config});
  }, [_config, config]);
};

export const useApi = <T extends new (_?: Configuration) => any>(
  Api: T,
  conf?: ConfigurationParameters,
): InstanceType<T> => {
  const defaultConf = useConfiguration(conf);
  return useMemo<InstanceType<T>>(
    () => new Api(defaultConf),
    [Api, defaultConf],
  );
};
