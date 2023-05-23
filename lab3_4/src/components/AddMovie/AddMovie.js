import {useEffect, useState} from "react";
import axios from "axios";
import {fetchData} from "../../fetchData";

const API_URL = 'http://localhost:3001';

function AddMovie() {
  const [title, setTitle] = useState('');
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');
  const [isAdded, setIsAdded] = useState(false);
  const [foundMovies, setFoundMovies] = useState([]);
  const [addedMovie, setAddedMovie] = useState({});

  const addMovie = (movie) => {
    const newMovie = {
      title: movie.l,
      imageUrl: movie?.i?.imageUrl || '',
      movieType: movie.q,
      date: new Date().toLocaleDateString(),
    };
    setAddedMovie(newMovie);
    setIsAdded(true);
  };

  const saveMovie = async () => {
    const newMovie = {
      ...addedMovie,
      rating: parseFloat(rating),
      comment: comment
    }

    try {
      await axios.post(`${API_URL}/movies`, newMovie);
      setTitle('');
      setRating('');
      setComment('');
      setAddedMovie({});
      setIsAdded(false);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (title.length > 4) {
      fetchData(title)
        .then((response) => {
          setFoundMovies(response.d);
          console.log(response)
        });
    }

  }, [title])

  return (
    <>
      <div className="content-block" style={{display: 'flex', flexDirection: 'row'}}>
        {isAdded ?
          <>
            <div className='movie-item'>
              <img src={addedMovie?.imageUrl || ''} alt="movie cover"/>
              <h3>{addedMovie.title}</h3>
              <p>{addedMovie.movieType}</p>
            </div>
            <div style={{
              display: 'flex',
              padding: '10px',
              flexDirection: 'column',
              flexGrow: 1,
              justifyContent: 'space-between'
            }}>
              <div className="add-movie-form">
                <label>Your rating (1-10)</label>
                <input
                  type="number"
                  name="rating"
                  min="1"
                  max="10"
                  onChange={(e) => setRating(e.target.value)}/>

                <label>Your comment</label>
                <textarea rows="5" onChange={(e) => setComment(e.target.value)}/>
              </div>
              <button
                onClick={saveMovie}
                className="app-btn"
                style={{width: '100%', marginTop: '20px'}}
              >add movie
              </button>
            </div>
          </>
          :
          <p style={{color: '#a1a1a1'}}>Enter title name and add movie to save it</p>
        }
      </div>

      <div className="content-block">
        <div className="add-movie-form">
          <label>Enter title name</label>
          <input type="text" onChange={(e) => setTitle(e.target.value)}/>
        </div>
        <div className="movies-container">
          {foundMovies.map((movie, index) => {
            const imgUrl = movie?.i?.imageUrl || '';
            return (
              <div key={index} className='movie-item'>
                <img src={imgUrl} alt="movie cover"/>
                <h4>{movie.l}</h4>
                <p>{movie.q}</p>
                <button className="app-btn" onClick={() => addMovie(movie)}> +</button>
              </div>
            )
          })}
        </div>
      </div>
    </>
  );
}

export default AddMovie;