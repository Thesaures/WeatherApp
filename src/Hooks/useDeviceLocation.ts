import GetLocation from 'react-native-get-location';
import { Float } from 'react-native/Libraries/Types/CodegenTypes';

export async function deviceLocation(): Promise<{ lat: Float; lon: Float }> {
  let lat: Float = 0;
  let lon: Float = 0;
  try {
    const location = await GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 60000,
    });
    lat = location.latitude;
    lon = location.longitude;
  } catch (error) {}
  return { lat, lon };
}
