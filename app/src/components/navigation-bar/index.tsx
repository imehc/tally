import React, {useMemo} from 'react';
import {Appbar} from 'react-native-paper';
import {getHeaderTitle} from '@react-navigation/elements';
import {type NativeStackHeaderProps} from '@react-navigation/native-stack';

export const NavigationBar: React.FC<NativeStackHeaderProps> = ({
  navigation,
  route,
  options,
  back,
}) => {
  const title = useMemo(
    () => getHeaderTitle(options, route.name),
    [options, route.name],
  );

  return (
    <Appbar.Header>
      {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title={title} />
    </Appbar.Header>
  );
};
