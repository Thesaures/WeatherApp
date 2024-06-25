import React from 'react';
import BottomTab from './src/Navigation/BottomTab';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Home from './src/Screens/Home/Index';
import BottomNavigation from './src/Navigation/BottomTab';
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
const App = () => {
  return (
    <GestureHandlerRootView>
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1 }}>
          {/* <StatusBar backgroundColor="transparent" translucent={true} /> */}
          <NavigationContainer>
            <BottomNavigation />
          </NavigationContainer>
        </SafeAreaView>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default App;
