import { Text, View } from 'react-native';
import style from '../Style';
import Card from '../../assets/HistoryCard.svg';
import Cloud from '../../assets/MoonClowd.svg';
import Celsius from '../Celsius';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const HistoryCard = () => {
  return (
    <View style={{ position: 'relative', marginTop: hp(4) }}>
      <Card width={wp(92)} height={hp(23)} />
      <Cloud style={style.cloud} />
      <View style={style.details}>
        <View style={style.current}>
          <Text style={style.currTemp}>22</Text>
          <Celsius height={2} width={4} border={1} />
        </View>
        <View style={style.temp}>
          <View style={style.current}>
            <Text style={style.hl}>H:24</Text>
            <Celsius height={0.8} width={1.6} border={1} />
          </View>
          <View style={style.current}>
            <Text style={style.hl}>L:14</Text>
            <Celsius height={0.8} width={1.6} border={1} />
          </View>
        </View>
        <View style={style.place}>
          <Text style={style.textPlace}>Banglore,India</Text>
          <Text style={style.textPlace}>Cloudy</Text>
        </View>
      </View>
    </View>
  );
};
export default HistoryCard;
