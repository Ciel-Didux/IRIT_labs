import {Link} from "react-router-dom";

function AppBar() {
  return (
    <div className="app-bar">
      <button className="app-btn">
        <Link to="movies">Добавлені</Link>
      </button>
      <button className="app-btn" style={{marginLeft: '20px'}}>
        <Link to="add-movie">
          <span> + </span>Додати
        </Link>
      </button>
    </div>
  );
}

export default AppBar;