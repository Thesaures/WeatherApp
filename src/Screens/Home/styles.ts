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
  lowTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: wp(15),
  },
  climate: {
    position: 'absolute',
    zIndex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    bottom: hp(65),
    // borderColor: 'red',
    // borderWidth: 3,
  },
  place: {
    color: 'white',
    fontSize: hp('4%'),
    // fontFamily: 'Playwrite',
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
    width: wp(30),
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
    // marginBottom: hp(100),
    padding: 8,
    // width: wp(400),
    borderWidth: 3,
    borderColor: 'red',
  },
  border: {
    // width: wp(103),
    position: 'absolute',
    zIndex: 1,
    height: hp(80),
    // bottom: hp(10),
    top: hp(57.5),
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
  modal: {
    height: hp(20),
    width: wp(90),
    backgroundColor: '#1C1B33',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  clickButton: {
    height: hp(5),
    width: wp(20),
    backgroundColor: '#362A84',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'white',
  },
  buttonStyle: {
    color: 'white',
    fontWeight: '500',
  },
  inputText: {
    fontSize: hp(2.2),
    color: '#9D9AB0',
    // backgroundColor: '#9D9AB0',
  },
  topTemp: {
    color: 'white',
    fontSize: hp(2),
  },
});
export default style;
