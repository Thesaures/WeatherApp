import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { Float } from 'react-native/Libraries/Types/CodegenTypes';
import { useWeatherDetails } from '../../Hooks/useLocationWeather';
import { weatherStackList } from '../../Types/StackLIst';
import { selectStatus } from '../../Utils/helper';
import Card from '../../assets/HistoryCard.svg';
import Cloud from '../../assets/MoonClowd.svg';
import { authStore } from '../../store/authStore';
import Celsius from '../Celsius';
import style from './Style';
import { location } from '../../Types/StackLIst';

const HistoryCard = (prop: location) => {
  const { lon, lat, place, index, selectedCard, setSelectedCard } = prop;
  const [tempH, setTempH] = useState(0);
  const [tempL, setTempL] = useState(0);
  const [currTemp, setCurrTemp] = useState(0);
  const [status, setStatus] = useState('');
  const navigation: StackNavigationProp<weatherStackList> = useNavigation();
  const update = async () => {
    const { detailsTask } = await useWeatherDetails(lon, lat);
    if (detailsTask) {
      setTempH(detailsTask.daily.temperature_2m_max);
      setTempL(detailsTask.daily.temperature_2m_min);
      setCurrTemp(detailsTask.current.temperature_2m);
      const details = selectStatus(detailsTask.current.weather_code);
      setStatus(details);
    }
  };
  useEffect(() => {
    update();
  }, []);
  const updateBorder = async () => {
    setSelectedCard(index);
    navigation.replace('Home', { lati: lat, longi: lon, loc: place });
  };
  const hiddenStyle = useAnimatedStyle(() => {
    return {
      borderColor: selectedCard == index ? '#7582F4' : '#9995AF',
    };
  });
  return (
    <TouchableOpacity onPress={updateBorder}>
      <Animated.View
        style={[
          {
            position: 'relative',
            marginTop: hp(4),
            borderLeftWidth: 6,
            borderBottomWidth: 6,
            borderRadius: 30,
          },
          hiddenStyle,
        ]}
      >
        <Card width={wp(92)} height={hp(23)} />
        <Cloud style={style.cloud} />
        <View style={style.details}>
          <View style={style.current}>
            <Text style={style.currTemp}>{currTemp}</Text>
            <Celsius height={2} width={4} border={1} />
          </View>
          <View style={style.temp}>
            <View style={style.current}>
              <Text style={style.hl}>H:{tempH}</Text>
              <Celsius height={0.8} width={1.6} border={1} />
            </View>
            <View style={style.currentLow}>
              <Text style={style.hl}>L:{tempL}</Text>
              <Celsius height={0.8} width={1.6} border={1} />
            </View>
          </View>
          <View style={style.place}>
            <Text style={style.textPlace}>{place}</Text>
            <Text style={style.textPlace}>{status}</Text>
          </View>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};
export default HistoryCard;
