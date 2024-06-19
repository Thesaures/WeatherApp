import { Animated, Text, View } from 'react-native';
import style from './style';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';

const AirQuality = () => {
  return (
    <View style={style.container}>
      <View style={style.head}>
        <Icon name="grain" size={30} color={'#9691AD'} />
        <Text style={style.headText}>AIR QUALITY</Text>
      </View>
      <Text style={style.nextText}>3-Low Health Risk</Text>
      <View style={{ justifyContent: 'center' }}>
        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#3659B1', '#D84CB8']}>
          <View style={style.graph}></View>
        </LinearGradient>
        <Animated.View
          style={[
            {
              height: 10,
              width: 10,
              backgroundColor: 'white',
              position: 'absolute',
              borderRadius: 50,
            },
            { transform: [{ translateX: 300 }] },
          ]}
        ></Animated.View>
      </View>
      <View style={style.last}>
        <Text style={style.lastText}>See more</Text>
        <Icon name="arrow-forward-ios" size={24} color={'#9691AD'} />
      </View>
    </View>
  );
};
export default AirQuality;
