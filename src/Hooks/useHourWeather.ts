import { Float } from 'react-native/Libraries/Types/CodegenTypes';
import apiClient from '../Axios/apiClient';
type ExtendedCreateUserResponse = {
  success: boolean;
  errorMessage: string;
  statusCode: string;
  hourDetails: object;
};
export async function hourWeatherDetails(
  lon: Float,
  lat: Float
): Promise<ExtendedCreateUserResponse> {
  let success: boolean = false;
  let errorMessage: string = '';
  let statusCode: string = '';
  let hourDetails: object = {};
  try {
    const createUserResponse = await apiClient.get(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m&forecast_days=1`
    );

    statusCode = createUserResponse.status.toString();
    {
      statusCode === '200' ? (success = true) : (success = false);
    }
    hourDetails = createUserResponse.data;
  } catch (error: any) {
    errorMessage = error.message;
  }
  return { success, statusCode, hourDetails, errorMessage };
}
