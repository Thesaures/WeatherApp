import { Text, View } from 'react-native';
import Style from './Style';
import Cloud from '../../assets/MoonClowd.svg';
import Celsius from '../Celsius';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
type hour = {
  time: string;
  temp: string;
};
const HourCard = (prop: hour) => {
  const { time, temp } = prop;
  const colors = ['#48319D', '#322B5C'];

  // Function to get a random color from the list
  function getRandomColor(colors: string[]) {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  }

  // Example usage

  return (
    <View style={[Style.container, { backgroundColor: getRandomColor(colors) }]}>
      <View>
        <Text style={Style.text}>{time}</Text>
      </View>
      <View>
        <Cloud height={hp(9)} width={wp(14)} style={{ bottom: 5 }} />
      </View>
      <View style={Style.temp}>
        <Text style={Style.text}>{temp}</Text>
        <Celsius height={0.8} width={1.6} border={1} />
      </View>
    </View>
  );
};
export default HourCard;
