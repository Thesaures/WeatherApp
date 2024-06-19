import { Float } from 'react-native/Libraries/Types/CodegenTypes';
import apiClient from '../Axios/apiClient';
type ExtendedCreateUserResponse = {
  success: boolean;
  errorMessage: string;
  statusCode: string;
  detailsTask: object;
};
export async function searchPlace(place: string): Promise<ExtendedCreateUserResponse> {
  let success: boolean = false;
  let errorMessage: string = '';
  let statusCode: string = '';
  let detailsTask: object = {};
  try {
    const createUserResponse = await apiClient.get(
      `https://geocoding-api.open-meteo.com/v1/search?name=kerala&count=1&language=en&format=json`
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
