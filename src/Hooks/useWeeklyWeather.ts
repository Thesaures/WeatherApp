import { Float } from 'react-native/Libraries/Types/CodegenTypes';
import apiClient from '../Axios/apiClient';
import { HourweekResult } from '../Types/StackLIst';
export async function useWeeklyWeatherDetails(lon: Float, lat: Float) {
  let success: boolean = false;
  let errorMessage: string = '';
  let statusCode: string = '';
  let weekDetails: HourweekResult = {
    daily: {
      time: [],
      temperature_2m_max: [],
    },
  };
  try {
    const createUserResponse = await apiClient.get(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weather_code,temperature_2m_max,temperature_2m_min`
    );
    weekDetails = createUserResponse.data;
  } catch (error: any) {
    errorMessage = error.message;
  }
  return { success, statusCode, weekDetails, errorMessage };
}
