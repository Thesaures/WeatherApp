import { StatusBar, Text, View, TextInput } from 'react-native';
import style from './Style';
import HistoryCard from '../../Components/HistoryCard';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { searchPlace } from '../../Hooks/useSearch';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useState } from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { weatherStackList } from '../../Types/StackLIst';
const Search = () => {
  const navigation: NavigationProp<weatherStackList> = useNavigation();
  const [place, setPlace] = useState('');
  const [lon, setLon] = useState(0);
  const [lat, setLat] = useState(0);
  const clickMe = async () => {
    const { detailsTask } = await searchPlace(place);
    setLon(detailsTask.longitude);
    setLat(detailsTask.latitude);
    navigation.navigate('LocationDetails', { longitude: lon, latitude: lat });
  };

  return (
    <View style={style.container}>
      <View style={style.heading}>
        <Text style={style.headingText}>Weather</Text>
      </View>
      <View style={style.input}>
        <Icon name="search" size={hp(4)} color={'#9D9AB0'} />
        <TextInput
          style={style.inputText}
          placeholder="Search for a city or airport"
          placeholderTextColor={'#9D9AB0'}
          onChangeText={setPlace}
          value={place}
          onSubmitEditing={clickMe}
        ></TextInput>
      </View>
      <View style={style.body}>
        <HistoryCard />
      </View>
    </View>
  );
};
export default Search;
