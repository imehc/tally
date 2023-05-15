import {StyleSheet} from 'react-native';
import {DefaultTheme} from 'react-native-paper';

const styles = StyleSheet.create({
  header: {
    height: 120,
    backgroundColor: DefaultTheme.colors.primary,
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
    paddingLeft: 30,
    paddingRight: 30,
  },
  dataWrap: {
    flexDirection: 'row',
  },
  expense: {
    color: '#fff',
    marginRight: 10,
  },
  income: {
    color: '#fff',
  },
  typeWrap: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  font: {
    color: '#fff',
  },
  font2: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
  },
  left: {
    marginRight: 10,
  },
  title: {},
  arrow: {},
  right: {},
  time: {},
});

export default styles;
