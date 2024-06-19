import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Search from '../Screens/Search/Index';
import Map from '../Screens/Map/Index';
import Home from '../Screens/Home/Index';
import LocationDetails from '../Screens/LocationDetails/Index';
const Stack = createNativeStackNavigator();

const BottomNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Map"
        component={Map}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Search"
        component={Search}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="LocationDetails"
        component={LocationDetails}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default BottomNavigation;
