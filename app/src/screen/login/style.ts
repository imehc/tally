import {StyleSheet} from 'react-native';
import {DefaultTheme} from 'react-native-paper';

const styles = StyleSheet.create({
  view: {
    flex: 1,
    paddingTop: '20%',
    paddingBottom: '20%',
  },
  desc: {
    fontSize: 30,
    fontWeight: '900',
    textAlign: 'center',
    marginTop: 12,
    color: DefaultTheme.colors.primary,
  },
  center: {
    alignItems: 'center',
  },
  center2: {
    flexDirection: 'row',
    marginTop: '20%',
    justifyContent: 'flex-start',
    alignContent: 'center',
    paddingLeft: 30,
    paddingRight: 30,
  },
  text: {
    fontSize: 20,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginRight: 10,
    marginLeft: 10,
    color: DefaultTheme.colors.secondary,
  },
  textChecked: {
    fontSize: 20,
    fontWeight: 'bold',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginRight: 10,
    marginLeft: 10,
    textDecorationLine: 'underline',
    color: DefaultTheme.colors.primary,
  },
  main: {
    marginTop: 20,
    paddingLeft: 30,
    paddingRight: 30,
  },
  input: {
    marginTop: 30,
    width: '100%',
  },
});

export default styles;
