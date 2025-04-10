import { useEffect, useState } from "react";
import RatingStars from "./RatingStars";
import DescriptionSelectedMovie from "./DescriptionSelectedMovie";
import { FaArrowLeft } from "react-icons/fa";

export default function SelectedMovie({
  selectedMovieId,
  setWatchedMovies,
  watchedMovies,
  setSelectedMovieId,
}) {
  let [selectedMovie, setSelectedMovie] = useState({});
  let [loading, setLoading] = useState(false);

  const url = "http://localhost:3001/movies";

  useEffect(() => {
    async function fetchSelectedMovie() {
      if (selectedMovieId) {
        setLoading(true);
        try {
          let res = await fetch(`${url}/${selectedMovieId}`);
          if (!res.ok) {
            throw new Error("Network response was not ok");
          }
          let data = await res.json();
          setSelectedMovie(data);
        } catch (error) {
          console.error("Fetch error:", error);
        } finally {
          setLoading(false);
        }
      }
    }

    fetchSelectedMovie();
  }, [selectedMovieId]);

  function AppearSection() {
    if (selectedMovieId)
      document.querySelector(".selectedMovie").classList.remove("hidden");
    else document.querySelector(".selectedMovie").classList.add("hidden");
  }

  function handleEscapeBtn() {
    window.addEventListener("keydown", (e) => {
      if (e.code === "Escape") {
        setSelectedMovieId(null);
      }
    });
  }

  useEffect(() => {
    AppearSection();
    handleEscapeBtn();
  }, [selectedMovieId]);

  return (
    <div className="selectedMovie text-white w-full lg:w-2/5 flex flex-wrap rounded-lg shadow-md">
      <div className="bg-fuchsia-950/40 w-full p-4">
        <button
          className="text-xl rounded-full bg-gray-950 p-2 mb-2 cursor-pointer hover:scale-115 duration-500"
          onClick={() => setSelectedMovieId(null)}
        >
          {" "}
          <FaArrowLeft />{" "}
        </button>
        {!loading && selectedMovieId ? (
          <div className="flex xl:flex-nowrap flex-wrap items-center leading-10">
            <img
              src={selectedMovie.primaryImage}
              alt={selectedMovie.primaryTitle}
              className="w-50 object-cover"
            />
            <div className="ms-4">
              <h1 className="text-xl font-bold">
                {selectedMovie.primaryTitle}
              </h1>
              <p>🗓️ {selectedMovie.releaseDate}</p>
              <p>⌛ {selectedMovie.runtimeMinutes} mins </p>
              <p>
                🎬 {selectedMovie.genres && selectedMovie.genres.join(", ")}
              </p>
              <p> 🌟 {selectedMovie.averageRating} IMDb Rating </p>
            </div>
          </div>
        ) : loading && selectedMovieId ? (
          <p className="text-bold text-fuchsia-50 text-lg"> Loading... </p>
        ) : null}
      </div>
      {!loading && selectedMovieId ? (
        <RatingStars
          setWatchedMovies={setWatchedMovies}
          selectedMovie={selectedMovie}
          watchedMovies={watchedMovies}
        />
      ) : null}
      {!loading && selectedMovieId ? (
        <DescriptionSelectedMovie selectedMovie={selectedMovie} />
      ) : null}
    </div>
  );
}
