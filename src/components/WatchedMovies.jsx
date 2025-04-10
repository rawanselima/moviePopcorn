import { useEffect } from "react";

export default function WatchedMovies({ watchedMovies, selectedMovieId }) {
  function avargeRatingUser(watchedMovies) {
    return watchedMovies.length > 0
      ? watchedMovies.reduce((a, b) => a + b.rating, 0) / watchedMovies.length
      : 0;
  }

  function avargeRatingApi(watchedMovies) {
    return watchedMovies.length > 0
      ? watchedMovies.reduce((a, b) => a + b.selectedMovie.averageRating, 0) /
          watchedMovies.length
      : 0;
  }

  function avargeMins(watchedMovies) {
    return watchedMovies.length > 0
      ? watchedMovies.reduce((a, b) => a + b.selectedMovie.runtimeMinutes, 0) /
          watchedMovies.length
      : 0;
  }

  function AppearSection() {
    if (!selectedMovieId)
      document.querySelector(".watchedMovie").classList.remove("hidden");
    else document.querySelector(".watchedMovie").classList.add("hidden");
  }

  useEffect(() => {
    AppearSection();
  }, [selectedMovieId]);

  return (
    <div className="watchedMovie w-full lg:w-2/5 bg-fuchsia-950/40 p-4 rounded-lg shadow-md">
      <h1 className="text-bold text-white text-lg mb-4 uppercase">
        Movies You Watched
      </h1>
      <div className="w-full flex flex-wrap justify-around items-center px-5 mb-4">
        <p className="text-fuchsia-50 text-lg">
          #️⃣ {watchedMovies.length} movies
        </p>
        <p className="text-fuchsia-50 text-lg">
          ⭐ {avargeRatingUser(watchedMovies).toFixed(1)}
        </p>
        <p className="text-fuchsia-50 text-lg">
          🌟 {avargeRatingApi(watchedMovies).toFixed(1)}
        </p>
        <p className="text-fuchsia-50 text-lg">
          ⌛ {avargeMins(watchedMovies)} mins
        </p>
      </div>
    </div>
  );
}
