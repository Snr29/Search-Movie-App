import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import MovieCard from "./components/MovieCard/MovieCard";

function App() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const getMovies = async () => {
      try {
        const { data } = await axios.get(
          "https://movies-app.prakashsakari.repl.co/api/movies"
        );
        setMovies(data);
      } catch (err) {
        console.log(err);
      }
    };
    getMovies();
  }, []);

  const filteredMovies =
    search === ""
      ? movies
      : movies.filter((movie) =>
          movie.name.toLowerCase().includes(search.toLocaleLowerCase())
        );

  return (
    <div className="App">
      <header className="header">
        <div className="heading-container">
          <h1 className="heading-1">Movies</h1>

          <div className="search-container">
            <FontAwesomeIcon icon={faSearch} className="search-icon" />
            <input
              type="text"
              placeholder="Search by Movie name"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </header>
      {filteredMovies.length > 0 && (
        <main className="main">
          {filteredMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </main>
      )}
    </div>
  );
}

export default App;
