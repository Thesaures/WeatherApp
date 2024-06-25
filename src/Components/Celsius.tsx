import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { View } from 'react-native';
type dimension = {
  height: number;
  width: number;
  border: number;
};
const Celsius = (props: dimension) => {
  const { height, width, border } = props;
  return (
    <View
      style={{
        height: hp(height),
        width: wp(width),
        borderWidth: border,
        borderColor: 'white',
        borderRadius: 50,
        bottom: '10%',
        marginTop: wp(1),
        // marginLeft: wp(1),
      }}
    ></View>
  );
};
export default Celsius;
