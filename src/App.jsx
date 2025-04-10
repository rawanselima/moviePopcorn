import "./App.css";
import AllMovies from "./components/AllMovies";
import Header from "./components/Header";
import { useState, useEffect } from "react";
import SelectedMovie from "./components/SelectedMovie";
import WatchedMovies from "./components/WatchedMovies";

// ========================================================================

//  to run project ***************************** npm run dev ******************
//  to run server for fetching data ************ npm run server *************

//========================================================================

function App() {
  let [movies, setMovies] = useState([]);
  let [loading, setLoading] = useState(false);
  let [error, setError] = useState(null);
  let [search, setSearch] = useState("");
  let [selectedMovieId, setSelectedMovieId] = useState(null);
  let [watchedMovies, setWatchedMovies] = useState([]);

  // const url = "https://imdb236.p.rapidapi.com/imdb/top250-movies";
  // const options = {
  //   method: "GET",
  //   headers: {
  //     "x-rapidapi-key": "6a7cad549emsh5b5def44f073460p1ed1ecjsn2ea763d48e2c",
  //     "x-rapidapi-host": "imdb236.p.rapidapi.com",
  //   },
  // };

  const url = "http://localhost:3001/movies";

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        let res = await fetch(url);
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        let data = await res.json();
        setMovies(data);
      } catch (error) {
        console.error("Fetch error:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <Header setSearch={setSearch} />
      <main className="bg-gray-950 min-h-screen w-full">
        <section className="flex items-start flex-wrap justify-around w-full lg:w-3/4 mx-auto py-8">
          <AllMovies
            movies={movies}
            loading={loading}
            error={error}
            search={search}
            setSelectedMovieId={setSelectedMovieId}
          />
          <WatchedMovies
            watchedMovies={watchedMovies}
            selectedMovieId={selectedMovieId}
          />
          <SelectedMovie
            selectedMovieId={selectedMovieId}
            setWatchedMovies={setWatchedMovies}
            watchedMovies={watchedMovies}
            setSelectedMovieId={setSelectedMovieId}
          />
        </section>
      </main>
    </>
  );
}

export default App;
