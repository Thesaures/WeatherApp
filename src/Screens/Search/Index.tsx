import { StatusBar, Text, View, TextInput, FlatList } from 'react-native';
import style from './Style';
import HistoryCard from '../../Components/HistoryCard';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSearchPlace } from '../../Hooks/useSearch';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useEffect, useState } from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { weatherStackList } from '../../Types/StackLIst';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SearchType } from '../../Types/StackLIst';
import SvgWithBackgroundVideo from '../../Components/SvgWithBackgroundVideo';
import Sungraph from '../../assets/Sungraph';
const Search = () => {
  const navigation: NavigationProp<weatherStackList> = useNavigation();
  const [place, setPlace] = useState('');
  const [lon, setLon] = useState(0);
  const [lat, setLat] = useState(0);
  const [selectedCard, setSeletedCard] = useState(-1);
  const [info, setInfo] = useState<SearchType[]>([]);
  // const clickMe = async () => {
  //   const { detailsTask } = await searchPlace(place);
  //   setLon(detailsTask.longitude);
  //   setLat(detailsTask.latitude);
  //   navigation.navigate('LocationDetails', { longitude: lon, latitude: lat });
  // };
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('key');
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.log(e);
    }
  };

  const logData = async () => {
    const array = await getData();
    console.log('data', array);
    setInfo(array);
  };
  useEffect(() => {
    logData();
  }, []);
  return (
    <View style={style.container}>
      <View style={style.heading}>
        <Text style={style.headingText}>History</Text>
      </View>
      <View style={style.input}>
        <Icon name="search" size={hp(4)} color={'#9D9AB0'} />
        <TextInput
          style={style.inputText}
          placeholder="Search for a city or airport"
          placeholderTextColor={'#9D9AB0'}
          onChangeText={setPlace}
          value={place}
          // onSubmitEditing={clickMe}
        ></TextInput>
      </View>
      <View style={style.body}>
        {/* <SvgWithBackgroundVideo />
        <Sungraph /> */}
        <FlatList
          data={info}
          renderItem={({ item, index }) => (
            <HistoryCard
              lon={item.latitude}
              lat={item.longitude}
              place={item.location}
              index={index}
              selectedCard={selectedCard}
              setSelectedCard={setSeletedCard}
            />
          )}
          // horizontal={true}
          keyExtractor={(_, i) => i?.toString()}
        />
      </View>
    </View>
  );
};
export default Search;
