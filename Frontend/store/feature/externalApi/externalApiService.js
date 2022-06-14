import axios from "axios";

export function getGeoLocation() {
  return axios.get("http://ip-api.com/json/");
}

export function getGenderPrediction(name) {
  return axios.get("https://api.genderize.io/", {
    params: { name: name },
  });
}

export function getWeather(lat, lon, timezone) {
  return axios.get(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min&timezone=${timezone}`
  );
}

export function getJoke() {
  return axios.get("https://api.chucknorris.io/jokes/random");
}
