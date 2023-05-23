import {useState} from "react";

function MovieItem({movie, updateMovie, removeMovie}) {
  const {id, title, imageUrl, movieType, date, rating, comment} = movie;
  const [editedComment, setEditedComment] = useState(comment);
  const [editedRating, setEditedRating] = useState(rating);
  const [isEditing, setIsEditing] = useState(false);

  const handleSaveButton = () => {
    const updatedMovie = {
      id, title, imageUrl, movieType, date,
      comment: editedComment,
      rating: editedRating
    };
    updateMovie(id, updatedMovie)
      .then(() => {
        setIsEditing(false);
      });
  }

  return (
    <div className='movie-item'>
      <img src={imageUrl} alt="movie cover"/>
      <h3 style={{fontSize: '20px'}}>{title}</h3>
      <p>{movieType}</p>
      <p>{`Добавлено: ${date}`}</p>
      {isEditing ? (
        <>
          <div className="add-movie-form">
            <label>⭐ (1-10)</label>
            <input
              type="number"
              name="rating"
              min="1"
              max="10"
              value={editedRating}
              onChange={(e) => setEditedRating(e.target.value)}/>

            <label>Коментар:</label>
            <textarea
              rows="5"
              value={editedComment}
              onChange={(e) => setEditedComment(e.target.value)}/>
          </div>
          <button
            className="app-btn"
            onClick={handleSaveButton}
          >Зберегти
          </button>
          <button
            className="app-btn"
            style={{backgroundColor: '#C94646', marginLeft: '10px'}}
            onClick={() => setIsEditing(false)}
          >Відмінити
          </button>
        </>
      ) : (
        <>
          <p>{`⭐${rating}`}</p>
          <p>{`Коментар: ${comment}`}</p>
          <button
            className="app-btn"
            onClick={() => setIsEditing(true)}
          >Редагувати
          </button>
          <button
            className="app-btn"
            style={{backgroundColor: '#C94646', marginLeft: '10px'}}
            onClick={() => removeMovie(id)}
          >Видалити
          </button>
        </>
      )}
    </div>
  );
}

export default MovieItem;