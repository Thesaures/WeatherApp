import { StatusBar, Text, View } from 'react-native';
import HourCard from '../../Components/HourCard/Index';
const Map = () => {
  return (
    <View>
      <StatusBar backgroundColor="transparent" translucent={true} />
      <Text>This is Map page</Text>
      <HourCard />
    </View>
  );
};
export default Map;
