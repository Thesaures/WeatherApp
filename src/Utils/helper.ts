const numberToStringMap = {
  0: 'Clear sky',
  1: 'Cloudy',
  2: 'Cloudy',
  3: 'Cloudy',
  45: 'Fog',
  48: 'Fog',
  51: 'Drizzle',
  53: 'Drizzle',
  55: 'Drizzle',
  56: 'Freezing Drizzle',
  57: 'Freezing Drizzle',
  61: 'Rain',
  63: 'Rain',
  65: 'Heavy Rain',
  66: 'Freezing rain',
  67: 'Freezing rain',
  71: 'Snow fall',
  73: 'Snow fall',
  75: 'Snow fall',
  77: 'Snow grains',
  80: 'Slight rain',
  81: 'Moderate rain',
  82: 'Violent rain',
  85: 'Slight snow',
  86: 'Heavy snow',
  95: 'Thunderstorm',
  96: 'Thunderstorm with slight hail',
  99: 'Thunderstorm with heavy hail',
};
let weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
type WeatherStatusKey = keyof typeof numberToStringMap;
export function selectStatus(num: WeatherStatusKey) {
  return numberToStringMap[num];
}

export function setTime(time: string[], temparature: string[]) {
  const combinedArray = time.map((time, index) => {
    const date = new Date(time);
    const clock = date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      hour12: true,
    });

    return { time: clock, temp: temparature[index] };
  });
  return combinedArray;
}

export function setWeek(week: string[], temparature: string[]) {
  const weekArray = week.map((week, index) => {
    const date = new Date(week);
    let dayName = weekdays[date.getDay()];

    return { day: dayName, temp: temparature[index] };
  });
  return weekArray;
}
