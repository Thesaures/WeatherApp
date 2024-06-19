import React, { useCallback, useEffect, useState } from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useDerivedValue,
  runOnJS,
} from 'react-native-reanimated';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  Text,
  View,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Button,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Logo from '../../assets/bottomTab.svg';
import Top from '../../assets/top.svg';
import style from './styles';
import AirQuality from '../../Components/AirQuality';
import {
  NavigationProp,
  createNavigationContainerRef,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { weatherStackList } from '../../Types/StackLIst';
import HourCard from '../../Components/HourCard/Index';
import { deviceLocation } from '../../Hooks/useDeviceLocation';
import { weatherDetails } from '../../Hooks/useLocationWeather';
import { reverseGeocode } from '../../Hooks/useCity';
import { selectStatus } from '../../Utils/helper';
import { hourWeatherDetails } from '../../Hooks/useHourWeather';
import { setTime } from '../../Utils/helper';
import { weeklyWeatherDetails } from '../../Hooks/useWeeklyWeather';
import { setWeek } from '../../Utils/helper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  Canvas,
  Fill,
  BackdropBlur,
  useImage,
  RoundedRect,
  Image,
  topLeft,
} from '@shopify/react-native-skia';
import Celsius from '../../Components/Celsius';
import Sunrise from '../../Components/SunriseComponent';
import BottomNavigation from '../../Navigation/BottomTab';
const LocationDetails = () => {
  const route: any = useRoute();
  const lon = route.params.longitude;
  const lat = route.params.latitude;
  console.log('this is latitude and longitude', lat, lon);
  const translationX = useSharedValue(0);
  // const size = useSharedValue({ width: 100, height: 50 });
  const translationY = useSharedValue<number>(0.8811383843421936);
  const prevTranslationX = useSharedValue(0);
  const prevTranslationY = useSharedValue(0);
  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: translationX.value }],
  }));
  const [showBottom, setShowBottom] = useState(false);

  const bottomDetail = useCallback(() => {
    setShowBottom(true);
  }, [translationY]);
  const bottomDetailSecond = useCallback(() => {
    setShowBottom(false);
  }, []);
  const pan = Gesture.Pan()

    .onStart(() => {
      prevTranslationX.value = translationX.value;
    })
    .onUpdate((event) => {
      translationX.value = event.translationX;
    });

  //Horizontal drag

  const animated = useAnimatedStyle(() => ({
    transform: [{ translateY: translationY.value }],
    backgroundColor: translationY.value < -2.1 ? '#3E3862' : '',
  }));
  const panTwo = Gesture.Pan()
    .onStart(() => {
      prevTranslationY.value = translationY.value;
    })
    .onUpdate((event) => {
      translationY.value = event.translationY + prevTranslationY.value;
      if (translationY.value < -62) {
        runOnJS(bottomDetail)(); // Set showBottom to false when translationY.value > -62
      }
      if (translationY.value > -62) {
        runOnJS(bottomDetailSecond)(); // Set showBottom to false when translationY.value > -62
      }
    });

  const hiddenStyle = useAnimatedStyle(() => {
    return {
      opacity: translationY.value < -62 ? 0 : 1,
    };
  });
  const showStyle = useAnimatedStyle(() => {
    // if (translationY.value < -62) {
    //   runOnJS(bottomDetail)();
    //   // bottomDetail();
    // } else if (translationY.value > -62) {
    //   runOnJS(bottomDetail)();
    //   // bottomDetail();
    // }
    return {
      height: translationY.value < -62 ? 100 : 0,
    };
  });
  //************************************************************************ */
  const image = useImage(require('../../assets/House.png'));
  const background = useImage(require('../../assets/Mountain.png'));
  const navigation: NavigationProp<weatherStackList> = useNavigation();
  const navigationRef = createNavigationContainerRef();
  const [show, setShow] = useState(true);
  const [placeName, setPlaceName] = useState('');
  const [temp, setTemp] = useState(0);
  const [tempH, setTempH] = useState(0);
  const [tempL, setTempL] = useState(0);
  const [status, setStatus] = useState('');
  const [forecast, setForecast] = useState(true);
  const [hour, setHour] = useState('white');
  const [week, setWeeks] = useState('#A09EB7');

  type climateData = {
    time: string;
    temp: string;
  };
  const [dataArray, setDataArray] = useState<climateData[]>([]);
  type weekData = {
    day: string;
    temp: string;
  };
  const [weekArray, setWeekArray] = useState<weekData[]>([]);
  const map = () => {
    navigation.navigate('Map');
  };
  const search = () => {
    navigation.navigate('Search');
  };
  const hide = () => {
    setShow(!show);
  };
  const weekHour = () => {
    setForecast(!forecast);
    setHour('white');
    setWeeks('#A09EB7');
  };
  const hourHour = () => {
    setForecast(!forecast);
    setHour('#A09EB7');
    setWeeks('white');
  };
  useEffect(() => {
    const getDetails = async () => {
      try {
        const { detailsTask } = await weatherDetails(lon, lat);
        // console.log('details ', detailsTask);
        // const placeName = await reverseGeocode(latitude, longitude);

        // const place = placeName.split(',');
        // const city = place[0];
        const situa = selectStatus(detailsTask.current.weather_code);
        // setPlaceName(city);
        setStatus(situa);
        setTemp(detailsTask.current.temperature_2m);
        setTempH(detailsTask.daily.temperature_2m_max);
        setTempL(detailsTask.daily.temperature_2m_min);
        const { hourDetails } = await hourWeatherDetails(lon, lat);
        const { weekDetails } = await weeklyWeatherDetails(lon, lat);
        const weekArray = setWeek(weekDetails.daily.time, weekDetails.daily.temperature_2m_max);
        setWeekArray(weekArray);
        const newArray = setTime(hourDetails.hourly.time, hourDetails.hourly.temperature_2m);
        setDataArray(newArray);
      } catch (error) {
        console.log(error);
      }
    };
    getDetails();
  }, []);
  return (
    <GestureHandlerRootView>
      <GestureDetector gesture={panTwo}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            backgroundColor: 'red',
          }}
        >
          {/* <View style={{ height: 800, width: 120, backgroundColor: 'violet' }}></View> */}
          {/* ******************************  This is bottom tab *******************************************************/}
          <Animated.View
            // pointerEvents={'box-only'}
            style={[
              {
                position: 'absolute',
                bottom: 0,
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 2,
                height: hp(8),
              },
              hiddenStyle,
            ]}
          >
            <Logo height={hp(98)} width={wp(98)} style={{ position: 'relative' }} />
            <View
              style={{
                flexDirection: 'row',
                position: 'absolute',
                width: wp(85),
                justifyContent: 'space-between',
              }}
            >
              <Icon
                name="location-pin"
                size={hp(4)}
                color={'white'}
                style={style.globe}
                onPress={map}
              />
              <TouchableOpacity onPress={hide}>
                <Icon name="add" size={hp(4)} color={'#5A47A6'} />
              </TouchableOpacity>
              <Icon
                name="format-list-bulleted"
                size={hp(4)}
                color={'white'}
                style={style.search}
                onPress={search}
              />
            </View>
          </Animated.View>
          {/* ******************************  This is bottom tab *******************************************************/}
          {/* <StatusBar backgroundColor="transparent" translucent={true} />#5D4AA6 */}
          {/* ******************************  This is location climate *******************************************************/}
          <Animated.View style={[style.climate, hiddenStyle]}>
            <Text style={style.place}>KAKKANAD</Text>
            <View style={style.degree}>
              <Text style={style.currentTemp}>{temp}</Text>
              <Celsius height={2} width={4} border={1.5} />
            </View>
            <Text style={style.currClimate}>{status}</Text>
            <View style={style.today}>
              <View style={style.degree}>
                <Text style={style.high}>H:{tempH}</Text>
                <Celsius height={1} width={2} border={1} />
              </View>
              <View style={style.degree}>
                <Text style={style.low}>L:{tempL}</Text>
                <Celsius height={1} width={2} border={1} />
              </View>
            </View>
          </Animated.View>
          {/* ******************************  This is location climate *******************************************************/}
          {/* ******************************  This is background *******************************************************/}
          <Canvas
            // onSize={size}
            style={{
              flex: 1,
              width: wp(100),
              // height: hp(25),
              // position: 'absolute',

              // zIndex: 1,
              backgroundColor: 'blue',
              marginHorizontal: 500,
            }}
          >
            <Image
              image={background}
              x={(wp(100) - wp(198)) / 2} // Center horizontally
              y={(hp(100) - hp(170)) / 2} // Center vertically
              width={wp(178)}
              height={hp(180)}
            />
            <Image image={image} x={wp(0)} y={hp(5)} width={wp(100)} height={hp(100)} />
            {show ? (
              <BackdropBlur
                blur={7}
                clip={{ x: wp(0), y: hp(54.5), width: wp(100), height: hp(50) }}
              >
                {/* <RoundedRect
                  x={18}
                  y={1002}
                  width={wp(100)}
                  height={hp(50)}
                  r={60} // Adjust the border radius as needed
                  color="#363A55" // Fill color with opacity
                  opacity={0.58}
                /> */}
              </BackdropBlur>
            ) : (
              <></>
            )}
          </Canvas>
          {/* ******************************  This is background *******************************************************/}
          {show ? (
            <>
              <Animated.View style={[animated, style.border]}>
                <View style={{ alignItems: 'center' }}>
                  <Top height={20} width={100} style={{}} />
                  <View style={style.weekhour}>
                    <Text style={[style.forecast, { color: hour }]} onPress={weekHour}>
                      Hourly Forecast
                    </Text>
                    <Text style={[style.forecast, { color: week }]} onPress={hourHour}>
                      Weekly Forecast
                    </Text>
                  </View>
                  <View style={style.line}></View>
                </View>
                <GestureDetector gesture={pan}>
                  <Animated.View style={[animatedStyles, style.climateData]}>
                    {forecast ? (
                      <FlatList
                        data={dataArray}
                        renderItem={({ item }) => <HourCard time={item.time} temp={item.temp} />}
                        horizontal={true}
                      />
                    ) : (
                      <FlatList
                        data={weekArray}
                        renderItem={({ item }) => <HourCard time={item.day} temp={item.temp} />}
                        horizontal={true}
                      />
                    )}
                  </Animated.View>
                </GestureDetector>
                {showBottom ? (
                  <Animated.View
                    style={[
                      {
                        backgroundColor: '#3E3862',
                        alignItems: 'center',
                      },
                      showStyle,
                    ]}
                  >
                    <AirQuality />
                    <Sunrise />
                  </Animated.View>
                ) : (
                  <></>
                )}
              </Animated.View>
            </>
          ) : (
            <View></View>
          )}
          <View></View>
        </View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

export default LocationDetails;
