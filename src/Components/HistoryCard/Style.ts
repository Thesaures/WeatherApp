import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const style = StyleSheet.create({
  details: {
    flexDirection: 'column',

    // height: 100,
    // width: 200,

    zIndex: 2,
    position: 'absolute',
    padding: wp(4),
    marginTop: hp(2),
  },
  temp: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    // width: wp(22),
  },
  place: {
    width: wp(80),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  currTemp: {
    color: 'white',
    fontSize: hp(8),
  },
  textPlace: {
    color: 'white',
    fontSize: hp(1.8),
  },
  hl: {
    color: 'white',
  },
  cloud: {
    position: 'absolute',
    bottom: hp(8),
    marginLeft: wp(53),
  },
  current: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currentLow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: wp(4),
  },
});
export default style;
