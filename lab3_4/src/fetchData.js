import axios from "axios";

const MOVIE_DB_API_URL = 'https://online-movie-database.p.rapidapi.com';
const X_RapidAPI_Key = '179f28cf72msh8f27247ada512d8p1e5db0jsn0921d48e3869';
const X_RapidAPI_Host = 'online-movie-database.p.rapidapi.com';

export const fetchData = (name) => {
  const options = {
    method: 'GET',
    url: `${MOVIE_DB_API_URL}/auto-complete`,
    params: {q: name},
    headers: {
      'X-RapidAPI-Key': X_RapidAPI_Key,
      'X-RapidAPI-Host': X_RapidAPI_Host
    }
  };

  return new Promise((res, rej) => {
    axios.request(options)
      .then((response) => {
      res(response.data);
    }).catch((error) => {
      rej(error);
    });
  })
};