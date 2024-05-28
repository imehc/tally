import {StyleSheet} from 'react-native';
import global from '../../theme/global';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 16,
  },
  header: {
    height: global.mainHeight,
    backgroundColor: global.mainColor,
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
    paddingLeft: global.paddingLeft,
    paddingRight: global.paddingRight,
  },
  subHeader: {
    height: global.subHeight,
    paddingLeft: global.paddingLeft,
    paddingRight: global.paddingRight,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subHeaderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    backgroundColor: global.secondBgColor,
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
