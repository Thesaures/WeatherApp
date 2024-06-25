import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import { Platform } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { weatherStackList } from '../../Types/StackLIst';
import { StackNavigationProp } from '@react-navigation/stack';
import { useCity } from '../../Hooks/useCity';

const Map = () => {
  const navigation: StackNavigationProp<weatherStackList> = useNavigation();
  const handleMessage = async (event: any) => {
    const data = JSON.parse(event.nativeEvent.data);
    if (data.latitude && data.longitude) {
      const { latitude, longitude } = data;
      const placeName = await useCity(latitude, longitude);
      console.log('this is place name   :', placeName);
      const place = placeName.split(',');
      const city = place[0];
      navigation.replace('Home', { lati: latitude, longi: longitude, loc: city });
    }
  };

  return (
    <View style={styles.container}>
      <WebView
        source={
          Platform.OS === 'android'
            ? require('../../assets/yandex-map.html')
            : require('../../assets/yandex-map.html')
        }
        style={styles.webview}
        javaScriptEnabled={true}
        allowsFullscreenVideo={true}
        onMessage={handleMessage} // Handle messages from the WebView
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  link: {
    color: '#000', // Change text color for better visibility
    fontSize: 12,
    position: 'absolute',
  },
  webview: {
    flex: 1, // Use flex to make WebView take up all available space
    position: 'relative',
  },
});

export default Map;
