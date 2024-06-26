import { Float } from 'react-native/Libraries/Types/CodegenTypes';
import apiClient from '../Axios/apiClient';
import { lonlat } from '../Types/StackLIst';
export async function useSearchPlace(place: string) {
  let success: boolean = false;
  let errorMessage: string = '';
  let statusCode: string = '';
  let detailsTask: lonlat = {
    longitude: 0,
    latitude: 0,
  };
  try {
    const createUserResponse = await apiClient.get(
      `https://geocoding-api.open-meteo.com/v1/search?name=${place}&count=1&language=en&format=json`
    );
    statusCode = createUserResponse.status.toString();
    {
      statusCode === '200' ? (success = true) : (success = false);
    }
    detailsTask = createUserResponse.data.results[0];
  } catch (error: any) {
    errorMessage = error.message;
  }
  return { success, statusCode, detailsTask, errorMessage };
}
