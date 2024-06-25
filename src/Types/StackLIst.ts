import { Float } from 'react-native/Libraries/Types/CodegenTypes';
import { WeatherStatusKey } from '../Utils/helper';
export type weatherStackList = {
  Map: undefined;
  Home: { longi: Float; lati: Float; loc: string };
  Search: undefined;
  LocationDetails: { longitude: Float; latitude: Float };
};
export type SearchType = {
  location: string;
  longitude: Float;
  latitude: Float;
};
export type location = {
  lon: Float;
  lat: Float;
  place: string;
  index: number;
  selectedCard: number;
  setSelectedCard: any;
};
export type result = {
  daily: DailyWeather;
  current: CurrentWeather;
};
export type CurrentWeather = {
  temperature_2m: number;
  weather_code: WeatherStatusKey;
};
export type DailyWeather = {
  temperature_2m_max: number;
  temperature_2m_min: number;
  weather_code: WeatherStatusKey;
};
export type weekHourResult = {
  hourly: hour;
};
export type hour = {
  time: string[];
  temperature_2m: string[];
};
export type HourweekResult = {
  daily: week;
};
export type week = {
  time: string[];
  temperature_2m_max: string[];
};
export type climateData = {
  time: string;
  temp: string;
};
export type Search = {
  location: string;
  longitude: number;
  latitude: number;
};

export type weekData = {
  day: string;
  temp: string;
};
export type lonlat = {
  longitude: Float;
  latitude: Float;
};
