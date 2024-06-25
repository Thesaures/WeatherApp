import { Float } from 'react-native/Libraries/Types/CodegenTypes';
import apiClient from '../Axios/apiClient';
import { weekHourResult } from '../Types/StackLIst';
export async function useHourWeatherDetails(lon: Float, lat: Float) {
  let success: boolean = false;
  let errorMessage: string = '';
  let statusCode: string = '';
  let hourDetails: weekHourResult = {
    hourly: {
      time: [],
      temperature_2m: [],
    },
  };
  try {
    const createUserResponse = await apiClient.get(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m&forecast_days=1`
    );
    hourDetails = createUserResponse.data;
  } catch (error: any) {
    errorMessage = error.message;
  }
  return { success, statusCode, hourDetails, errorMessage };
}
