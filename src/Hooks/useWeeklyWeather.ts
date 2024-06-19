import { Float } from 'react-native/Libraries/Types/CodegenTypes';
import apiClient from '../Axios/apiClient';
type ExtendedCreateUserResponse = {
  success: boolean;
  errorMessage: string;
  statusCode: string;
  weekDetails: object;
};
export async function weeklyWeatherDetails(
  lon: Float,
  lat: Float
): Promise<ExtendedCreateUserResponse> {
  let success: boolean = false;
  let errorMessage: string = '';
  let statusCode: string = '';
  let weekDetails: object = {};
  try {
    const createUserResponse = await apiClient.get(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weather_code,temperature_2m_max,temperature_2m_min`
    );

    statusCode = createUserResponse.status.toString();
    {
      statusCode === '200' ? (success = true) : (success = false);
    }
    weekDetails = createUserResponse.data;
  } catch (error: any) {
    errorMessage = error.message;
  }
  return { success, statusCode, weekDetails, errorMessage };
}
