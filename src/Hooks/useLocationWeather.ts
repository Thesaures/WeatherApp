import { Float } from 'react-native/Libraries/Types/CodegenTypes';
import apiClient from '../Axios/apiClient';
import { result } from '../Types/StackLIst';

export async function useWeatherDetails(lon: Float, lat: Float) {
  console.log('this is the data i got in api', lon, lat);
  let success: boolean = false;
  let errorMessage: string = '';
  let statusCode: string = '';
  let detailsTask: result = {
    daily: {
      temperature_2m_max: 0,
      temperature_2m_min: 0,
      weather_code: 0,
    },
    current: {
      temperature_2m: 0,
      weather_code: 0,
    },
  };
  try {
    const createUserResponse = await apiClient.get(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&forecast_days=1`
    );
    detailsTask = createUserResponse.data;
    console.log('this is the data i got from api', detailsTask);
  } catch (error: any) {
    errorMessage = error.message;
  }
  return { success, statusCode, detailsTask, errorMessage };
}
