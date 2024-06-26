import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3E2E71',
    flexDirection: 'column',
    padding: hp(2),
  },
  heading: {
    flex: 0.1,
    justifyContent: 'center',
  },
  body: {
    flex: 0.9,
  },
  headingText: {
    color: 'white',
    fontSize: hp(3.5),
  },
  input: {
    backgroundColor: '#1C1B33',
    borderRadius: 13,
    flexDirection: 'row',
    alignItems: 'center',
    padding: wp(1.5),
  },
  inputText: {
    fontSize: hp(2.2),
    color: '#9D9AB0',
  },
});
export default style;
