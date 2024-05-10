import React, {useState, useCallback, useReducer, useMemo} from 'react';
import {
  Avatar,
  Button,
  Text,
  TextInput,
  TouchableRipple,
} from 'react-native-paper';
import {useForm, Controller} from 'react-hook-form';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {type NativeStackScreenProps} from '@react-navigation/native-stack';
import {type RootStackParamList} from '../../router';
import {View} from 'react-native';
import styles from './style';
import {useConfiguration} from '../../client';
import {
  type LoginRequest,
  UserApi,
  RegisterRequest,
  ResponseError,
} from '../../tally-api';
import {useMutation} from '@tanstack/react-query';
import Toast from 'react-native-toast-message';
import {useAuthContext} from '../../provider';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

type ToggleButtonType = 'login' | 'register';

const schema = z
  .object({
    username: z
      .string({required_error: '请输入账号'})
      .min(4, '最少为4个字符')
      .max(8, '最多为8个字符')
      .regex(/^[a-zA-Z][a-zA-Z0-9]*$/, '只能为英文或数字且不能以数字开头'),
    password: z
      .string({required_error: '请输入密码'})
      .min(4, '最少为4个字符')
      .max(8, '最多为16个字符')
      .regex(/^[a-zA-Z][a-zA-Z0-9]*$/, '只能为英文或数字且不能以数字开头'),
  })
  .required();

export const LoginScreen: React.FC<Props> = ({}) => {
  const defaultConfig = useConfiguration();
  const authApi = useMemo(() => {
    return new UserApi(defaultConfig);
  }, [defaultConfig]);

  const {setAccessToken} = useAuthContext();

  const [authMode, setAuthMode] = useState<ToggleButtonType>('login');
  // 密码是否不可见
  const [notVisible, setNotVisible] = useReducer<(state: boolean) => boolean>(
    state => !state,
    true,
  );

  const {mutate: handleRegister} = useMutation({
    mutationFn: async (value: RegisterRequest) => {
      // TODO: 头像不应该必传，这里暂时硬编码
      return await authApi.register({
        RegisterRequest: value,
      });
    },
    onSuccess: () => {
      setAuthMode('login');
      Toast.show({
        type: 'success',
        text1: '注册成功',
        text2: '请登录',
      });
    },
    onError: error => {
      if (error instanceof ResponseError) {
        if (error.response.status === 422) {
          Toast.show({
            type: 'error',
            text1: '该用户已存在',
            text2: '请重新输入',
          });
          return;
        }
        Toast.show({
          type: 'error',
          text1: '输入不合法',
          text2: '请重新输入',
        });
        return;
      }
      Toast.show({
        type: 'error',
        text1: '系统错误',
      });
    },
  });

  const {mutate: handleLogin} = useMutation({
    mutationFn: async (value: LoginRequest) => {
      const res = await authApi.login({LoginRequest: value});
      return res.data;
    },
    onSuccess: ({accessToken}) => {
      setAccessToken(accessToken);
      Toast.show({
        type: 'success',
        text1: '登录成功',
      });
    },
    onError: error => {
      if (error instanceof ResponseError) {
        Toast.show({
          type: 'error',
          text1: '用户名或密码错误',
          text2: '请重新输入',
        });
        return;
      }
      Toast.show({
        type: 'error',
        text1: '系统错误',
      });
    },
  });

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<LoginRequest>({
    resolver: zodResolver(schema),
  });
  const onSubmit = useCallback(
    (auth: LoginRequest) => {
      if (authMode === 'register') {
        handleRegister({
          ...auth,
          avatar:
            'http://s.yezgea02.com/1615973940679/WeChat77d6d2ac093e247c361f0b8a7aeb6c2a.png',
        } as RegisterRequest);
        return;
      }
      handleLogin(auth);
    },
    [authMode, handleLogin, handleRegister],
  );

  return (
    <View style={styles.view}>
      <View style={styles.center}>
        <Avatar.Image size={80} source={{uri: 'https://picsum.photos/700'}} />
      </View>
      <Text style={styles.desc}>欢迎来到记账本</Text>
      <View style={styles.center2}>
        <TouchableRipple onPress={() => setAuthMode('login')}>
          <Text style={styles[authMode === 'login' ? 'textChecked' : 'text']}>
            登录
          </Text>
        </TouchableRipple>
        <TouchableRipple onPress={() => setAuthMode('register')}>
          <Text
            style={styles[authMode === 'register' ? 'textChecked' : 'text']}>
            注册
          </Text>
        </TouchableRipple>
      </View>
      <View style={styles.main}>
        <Controller
          control={control}
          rules={{required: true}}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              style={styles.input}
              placeholder="请输入账号"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              //issue: https://github.com/callstack/react-native-paper/pull/4385#issuecomment-2081106267
              left={<TextInput.Icon icon="account" forceTextInputFocus />}
              error={!!errors.username}
            />
          )}
          name="username"
        />
        <Text style={styles.helpText}>{errors.username?.message}</Text>
        <Controller
          control={control}
          rules={{required: true}}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              style={styles.input}
              placeholder="请输入密码"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              secureTextEntry={notVisible}
              left={<TextInput.Icon icon="shield-sword" forceTextInputFocus />}
              right={
                <TextInput.Icon
                  icon="eye"
                  onPress={setNotVisible}
                  forceTextInputFocus
                />
              }
              error={!!errors.password}
            />
          )}
          name="password"
        />
        <Text style={styles.helpText}>{errors.password?.message}</Text>
        <Button
          style={styles.button}
          contentStyle={{height: 48}}
          mode="contained"
          onPress={handleSubmit(onSubmit)}>
          {authMode === 'login' ? '登录' : '注册'}
        </Button>
      </View>
    </View>
  );
};
