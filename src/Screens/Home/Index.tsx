import React, { useCallback, useEffect, useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { createNavigationContainerRef, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { BackdropBlur, Canvas, Image, RoundedRect, useImage } from '@shopify/react-native-skia';
import { Dimensions, FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import LoaderKit from 'react-native-loader-kit';
import Modal from 'react-native-modal';
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Float } from 'react-native/Libraries/Types/CodegenTypes';
import AirQuality from '../../Components/AirQuality';
import Celsius from '../../Components/Celsius';
import HourCard from '../../Components/HourCard/Index';
import Sunrise from '../../Components/SunriseComponent';
import { deviceLocation } from '../../Hooks/useDeviceLocation';
import { useHourWeatherDetails } from '../../Hooks/useHourWeather';
import { useWeatherDetails } from '../../Hooks/useLocationWeather';
import { useSearchPlace } from '../../Hooks/useSearch';
import { useWeeklyWeatherDetails } from '../../Hooks/useWeeklyWeather';
import { weatherStackList } from '../../Types/StackLIst';
import { selectStatus, setTime, setWeek } from '../../Utils/helper';
import Logo from '../../assets/bottomTab.svg';
import Top from '../../assets/top.svg';
import style from './styles';
import { climateData, Search, weekData } from '../../Types/StackLIst';
const Home = () => {
  const image = useImage(require('../../assets/House.png'));
  const background = useImage(require('../../assets/Mountain.png'));
  const navigation: StackNavigationProp<weatherStackList> = useNavigation();
  const navigationRef = createNavigationContainerRef();
  const [show, setShow] = useState(false);
  const [placeName, setPlaceName] = useState('');
  const [temp, setTemp] = useState(0);
  const [tempH, setTempH] = useState(0);
  const [tempL, setTempL] = useState(0);
  const [status, setStatus] = useState('');
  const [forecast, setForecast] = useState(true);
  const [hour, setHour] = useState('white');
  const [week, setWeeks] = useState('#A09EB7');
  const [place, setPlace] = useState('');
  const [lon, setLon] = useState(0);
  const [lat, setLat] = useState(0);
  const [loader, setLoader] = useState(true);
  const [dataArray, setDataArray] = useState<climateData[]>([]);
  const [showBottom, setShowBottom] = useState(false);
  const [weekArray, setWeekArray] = useState<weekData[]>([]);
  const route: any = useRoute();
  const { lati, longi, loc } = route.params || { lati: null, longi: null };
  let longitude: Float;
  let latitude: Float;
  const { width, height } = Dimensions.get('screen');
  const MIN_TRANSLATION_Y = -height * 0.38;
  function clamp(val: any) {
    'worklet';
    return Math.min(Math.max(val, MIN_TRANSLATION_Y), 0);
  }
  const translationY = useSharedValue<number>(0);
  const prevTranslationY = useSharedValue(0);

  const bottomDetail = useCallback(() => {
    if (!showBottom) setShowBottom(true);
  }, []);

  const bottomDetailSecond = useCallback(() => {
    setShowBottom(false);
  }, []);
  const panTwo = Gesture.Pan()
    .onStart(() => {
      prevTranslationY.value = translationY.value;
    })
    .activateAfterLongPress(1500)
    .onUpdate((event) => {
      translationY.value = clamp(prevTranslationY.value + event.translationY);
      if (translationY.value == 0) {
        runOnJS(bottomDetailSecond)();
      } else {
        runOnJS(bottomDetail)();
      }
    });
  const animated = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translationY.value }],
      backgroundColor: translationY.value < 0 ? '#3E3862' : 'transparent',
    };
  });
  const hiddenStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translationY.value,
      [-300, -270, -250, -230, -200, -170, -150, -100, 50, 0], // Input range
      [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1] // Output range
    );
    return {
      opacity: opacity,
    };
  });
  const topShowStyle = useAnimatedStyle(() => {
    return {
      opacity: translationY.value < -300 ? 1 : 0,
    };
  });
  const showStyle = useAnimatedStyle(() => {
    return {
      opacity: translationY.value < -43 ? 1 : 0,
    };
  });
  //************************************************************************ */

  //************************************************************** */
  const placeSearch = async () => {
    const { detailsTask } = await useSearchPlace(place);
    setLon(detailsTask.longitude);
    setLat(detailsTask.latitude);

    const storeData = async (value: Search) => {
      try {
        const jsonValue = await AsyncStorage.getItem('key');
        let searches: Search[] = jsonValue != null ? JSON.parse(jsonValue) : [];
        searches.unshift(value);
        if (searches.length > 4) {
          searches = searches.slice(0, 4);
        }
        const updatedJsonValue = JSON.stringify(searches);
        await AsyncStorage.setItem('key', updatedJsonValue);
      } catch (e) {
        console.log('this is error', e);
      }
    };
    if (detailsTask.longitude && detailsTask.latitude) {
      storeData({
        location: place,
        longitude: detailsTask.longitude,
        latitude: detailsTask.latitude,
      });
      console.log('this is passed data first :', detailsTask.longitude, detailsTask.latitude);
      navigation.push('Home', {
        lati: detailsTask.longitude,
        longi: detailsTask.latitude,
        loc: place,
      });
      setShow(false);
    }
  };
  //*************************************************************** */
  const map = () => {
    navigation.navigate('Map');
  };
  const search = () => {
    navigation.navigate('Search');
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
        if (lati !== null && lati !== undefined && longi !== null && longi !== undefined) {
          longitude = longi;
          latitude = lati;
          setPlaceName(loc);
          console.log('this is the data i got', longi, lati, loc);
        } else {
          const { lat, lon } = await deviceLocation();
          longitude = lon;
          latitude = lat;
        }

        const { detailsTask } = await useWeatherDetails(longitude, latitude);
        // console.log('details ', detailsTask);
        // const placeName = await reverseGeocode(latitude, longitude);
        // console.log('this is place name', placeName);
        // const place = placeName.split(',');
        // const city = place[0];

        // setPlaceName(city);

        const { hourDetails } = await useHourWeatherDetails(longitude, latitude);
        const { weekDetails } = await useWeeklyWeatherDetails(longitude, latitude);
        const weekArray = setWeek(weekDetails.daily.time, weekDetails.daily.temperature_2m_max);
        const situa = selectStatus(detailsTask.current.weather_code);
        const newArray = setTime(hourDetails.hourly.time, hourDetails.hourly.temperature_2m);
        setStatus(situa);
        setTemp(detailsTask.current.temperature_2m);
        setTempH(detailsTask.daily.temperature_2m_max);
        setTempL(detailsTask.daily.temperature_2m_min);
        setWeekArray(weekArray);
        setDataArray(newArray);
        if (newArray) {
          setLoader(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getDetails();
  }, [lati, longi]);
  return (
    <>
      {loader ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',

            backgroundColor: '#352E64',
          }}
        >
          <Text style={{ color: 'white', fontSize: hp(8) }}>WeatherApp</Text>
          <LoaderKit style={{ width: 50, height: 50 }} name={'BallPulse'} color={'white'} />
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            backgroundColor: '#352E64',
          }}
        >
          <Animated.View
            style={[
              {
                position: 'absolute',
                zIndex: 1,
                bottom: hp(80),
                flexDirection: 'column',
                alignItems: 'center',
              },
              topShowStyle,
            ]}
          >
            <Text style={style.place}>Kakkanad</Text>
            <View style={{ flexDirection: 'row' }}>
              <Text style={style.topTemp}>19 </Text>
              <Text style={style.currClimate}>| Mostly Cloudy</Text>
            </View>
          </Animated.View>
          {/* THIS IS MODAL */}
          <Modal isVisible={show} onBackdropPress={() => setShow(false)}>
            <View style={style.modal}>
              <TextInput
                style={style.inputText}
                placeholder="Search for a city or airport"
                placeholderTextColor={'#9D9AB0'}
                onChangeText={setPlace}
                value={place}
                // onSubmitEditing={clickMe}
              ></TextInput>
              <TouchableOpacity style={style.clickButton} onPress={placeSearch}>
                <Text style={style.buttonStyle}>Search</Text>
              </TouchableOpacity>
            </View>
          </Modal>

          {/* <StatusBar backgroundColor="transparent" translucent={true} />#5D4AA6 */}
          {/* ******************************  This is location climate *******************************************************/}
          <Animated.View style={[style.climate, hiddenStyle]}>
            <Text style={style.place}>{placeName}</Text>
            <View style={style.degree}>
              <Text style={style.currentTemp}>{temp}</Text>
              <Celsius height={2} width={4} border={1.5} />
            </View>
            <Text style={style.currClimate}>{status}</Text>
            <View style={style.today}>
              <View style={style.lowTop}>
                <Text style={style.high}>H:{tempH}</Text>
                <Celsius height={0.8} width={1.6} border={1} />
              </View>
              <View style={style.lowTop}>
                <Text style={style.low}>L:{tempL}</Text>
                <Celsius height={0.8} width={1.6} border={1} />
              </View>
            </View>
          </Animated.View>
          {/* ******************************  This is location climate *******************************************************/}
          {/* ******************************  This is background *******************************************************/}
          <Canvas
            style={{
              flex: 1,
              width: wp(100),
              height: hp(95),
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
            <BackdropBlur blur={7} clip={{ x: wp(0), y: hp(57.5), width: wp(100), height: hp(50) }}>
              <RoundedRect
                x={wp(0)}
                y={hp(57.5)}
                width={wp(100)}
                height={hp(50)}
                r={60} // Adjust the border radius as needed
                color="#363A55" // Fill color with opacity
                opacity={0.58}
              />
            </BackdropBlur>
          </Canvas>
          {/* ******************************  This is background ****************************************************** */}
          <GestureDetector gesture={panTwo}>
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
              {forecast ? (
                <FlatList
                  data={dataArray}
                  style={{ marginTop: hp(2), width: wp(95) }}
                  renderItem={({ item }) => <HourCard time={item.time} temp={item.temp} />}
                  horizontal={true}
                  keyExtractor={(_, i) => i?.toString()}
                  showsHorizontalScrollIndicator={false}
                />
              ) : (
                <FlatList
                  data={weekArray}
                  style={{ marginTop: hp(2), width: wp(95) }}
                  renderItem={({ item }) => <HourCard time={item.day} temp={item.temp} />}
                  horizontal={true}
                  keyExtractor={(_, i) => i?.toString()}
                  showsHorizontalScrollIndicator={false}
                />
              )}
              <Animated.View
                style={[
                  {
                    alignItems: 'center',
                    marginBottom: hp(6),
                  },
                  showStyle,
                ]}
              >
                <AirQuality />
                <Sunrise />
              </Animated.View>
            </Animated.View>
          </GestureDetector>
          <Animated.View
            style={[
              {
                alignItems: 'center',
                justifyContent: 'center',
                bottom: -80,
                position: 'absolute',
                zIndex: 2,
              },
              hiddenStyle,
            ]}
          >
            <Logo height={hp(30)} width={wp(98)} style={{ position: 'relative' }} />
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
              <TouchableOpacity onPress={() => setShow(true)}>
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
        </View>
      )}
    </>
  );
};

export default Home;
