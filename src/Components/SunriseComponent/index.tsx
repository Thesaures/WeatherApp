import { Text, View } from 'react-native';
import style from './Style';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Sunrise = () => {
  return (
    <View style={style.conatainer}>
      <View style={style.head}>
        <Icon name="sunny" size={24} color={'#9691AD'} />
        <Text style={style.headText}>SUNRISE</Text>
      </View>
      <Text style={style.time}>5:35 AM</Text>
      <Text style={style.bottom}>Sunset: 7:25 PM</Text>
    </View>
  );
};
export default Sunrise;
