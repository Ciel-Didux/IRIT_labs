import MovieItem from "../MovieItem/MovieItem";
import {useEffect, useState} from "react";
import axios from "axios";

const API_URL = 'http://localhost:3001';

function Movies() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}/movies`)
      .then((response) => {setMovies(response.data);})
      .catch((error) => {
        console.error(error);
      })
  }, [])

  const updateMovie = async (id, updatedMovie) => {
    try {
      await axios.put(`${API_URL}/movies/${id}`, updatedMovie);
      setMovies(movies.map(movie => movie.id === id ? updatedMovie : movie));
    } catch (error) {
      console.error(error);
    }
  };

  const removeMovie = async (id) => {
    try {
      await axios.delete(`${API_URL}/movies/${id}`);
      setMovies(movies.filter(movie => movie.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='movies-container content-block'>
      {movies.map((movie) => {
        return <MovieItem
          key={movie.id}
          movie={movie}
          updateMovie={updateMovie}
          removeMovie={removeMovie}
        />
      })}
    </div>
  );
}

export default Movies;