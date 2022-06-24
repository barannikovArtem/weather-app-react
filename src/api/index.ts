const api = {
  key: process.env.REACT_APP_WEATHER_API_KEY,
  base: "https://api.openweathermap.org/data/2.5/"
}

export const request = async (endpoint: string) => {
  const response = await fetch(`${api.base}weather?q=${endpoint}&units=metric&APPID=${api.key}`)

  return response.json();
};
