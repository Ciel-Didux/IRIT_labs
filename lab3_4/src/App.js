import './App.css';
import Movies from "./components/Movies/Movies";
import AppBar from "./components/AppBar/AppBar";
import {Route, Routes} from "react-router-dom";
import AddMovie from "./components/AddMovie/AddMovie";

function App() {
  return (
    <div className="App">
      <div className="app-wrapper">
        <AppBar/>
        <Routes>
          <Route path="movies" element={<Movies/>}/>
          <Route path="add-movie" element={<AddMovie/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;