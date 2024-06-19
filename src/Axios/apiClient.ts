import axios from 'axios';

var apiClient = axios.create();
// apiClient.defaults.baseURL = `https://api.open-meteo.com/v1/forecast?`;
console.log(apiClient.defaults.baseURL);
apiClient.defaults.headers.common['Content-Type'] = 'application/json';
export default apiClient;
