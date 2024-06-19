import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const style = StyleSheet.create({
  degree: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  climate: {
    position: 'absolute',
    zIndex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    bottom: hp('67%'),
  },
  place: {
    color: 'white',
    fontSize: hp('4%'),
    fontFamily: 'Playwrite',
  },
  currentTemp: {
    color: 'white',
    fontSize: hp('10%'),
  },
  currClimate: {
    color: 'white',
    fontSize: hp('2.2%'),
  },
  high: {
    color: 'white',
    fontSize: hp('2%'),
  },
  low: {
    color: 'white',
    fontSize: hp('2%'),
  },
  today: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: wp('30%'),
  },
  // celsius:{
  //   marginLeft:60,
  // },
  line: {
    height: hp('.1%'),
    width: wp('90%'),
    backgroundColor: 'white',
    marginTop: hp('2%'),
  },
  climateData: {
    // marginTop: hp(-9),
    padding: 20,
    width: wp(400),
  },
  border: {
    width: wp(103),
    position: 'absolute',
    zIndex: 2,
    bottom: hp(20),
    borderTopWidth: 0.5,
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    borderBottomWidth: 0,
    borderTopColor: 'white',
    borderLeftColor: 'white',
    borderRightColor: 'white',
    borderTopRightRadius: 65,
    borderTopLeftRadius: 65,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  weekhour: {
    height: hp(3),
    width: wp(100),
    // marginTop: hp(-5),
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    // marginRight: wp('10%'),
  },
  forecast: {
    fontSize: hp('2%'),
    zIndex: 5,
  },
  search: {
    // position: 'absolute',
    // zIndex: 3,
    // bottom: 210,
    // left: '80%',
  },
  globe: {
    // position: 'absolute',
    // zIndex: 3,
    // bottom: 240,
    // left: '10%',
  },
  // plus: {
  //   position: 'absolute',
  //   zIndex: 5,
  //   marginBottom: 20,
  //   left: '45%',
  // },

  // drag: {
  //   position: 'absolute',
  //   zIndex: 5,
  //   height: 100,
  //   width: 100,
  //   backgroundColor: 'red',
  // },
});
export default style;
