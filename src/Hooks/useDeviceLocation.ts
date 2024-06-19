import GetLocation from 'react-native-get-location';
import { Float } from 'react-native/Libraries/Types/CodegenTypes';

export async function deviceLocation(): Promise<{ latitude: Float; longitude: Float }> {
  let latitude: Float = 0;
  let longitude: Float = 0;
  try {
    const location = await GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 60000,
    });
    latitude = location.latitude;
    longitude = location.longitude;
  } catch (error) {}
  return { latitude, longitude };
}
