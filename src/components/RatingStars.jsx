import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa6";
import { useState } from "react";

export default function RatingStars({
  setWatchedMovies,
  selectedMovie,
  watchedMovies,
}) {
  let [starsClicked, setStarsClicked] = useState({
    status: false,
    indexStar: null,
  });
  let [starsHover, setStarsHover] = useState({
    status: false,
    indexStar: null,
  });

  function handleMouseEnter(index) {
    setStarsHover({ status: true, indexStar: index });
  }

  function handleMouseLeave() {
    setStarsHover({ status: false, indexStar: null });
  }

  function handleClick(index) {
    setStarsClicked({ status: true, indexStar: index });
  }

  function addSelectedMovieToWatchedMovies(
    watchedMovies,
    selectedMovie,
    starsClicked
  ) {
    let checkNewMovie = watchedMovies.find(
      (ele) => ele.selectedMovie.id === selectedMovie.id
    );

    if (checkNewMovie) {
      setWatchedMovies((prev) =>
        prev.map((ele) =>
          ele.selectedMovie.id === checkNewMovie.selectedMovie.id
            ? { ...ele, rating: starsClicked.indexStar + 1 }
            : ele
        )
      );
    } else {
      setWatchedMovies((prev) => [
        ...prev,
        { selectedMovie: selectedMovie, rating: starsClicked.indexStar + 1 },
      ]);
    }

    console.log(watchedMovies);
  }

  return (
    <div className="justify-center w-full bg-fuchsia-950/40 my-5 p-4 rounded-lg shadow-md">
      <div className="flex justify-center items-center w-full">
        <p>
          {new Array(10).fill(0).map((_, index) => {
            // Check for hover state first, then clicked state
            if (
              (starsHover.status && starsHover.indexStar >= index) ||
              (starsClicked.status && starsClicked.indexStar >= index)
            ) {
              return (
                <FaStar
                  key={index}
                  className="star text-yellow-500 inline text-xl cursor-pointer"
                  onMouseLeave={handleMouseLeave}
                  onMouseEnter={() => handleMouseEnter(index)}
                  onClick={() => handleClick(index)}
                />
              );
            } else {
              return (
                <CiStar
                  key={index}
                  className="star text-yellow-500 inline text-2xl cursor-pointer"
                  onMouseEnter={() => handleMouseEnter(index)}
                  onClick={() => handleClick(index)}
                />
              );
            }
          })}
        </p>

        <p className="text-xl ms-2">
          {starsHover.indexStar !== null
            ? starsHover.indexStar + 1
            : starsClicked.indexStar !== null
            ? starsClicked.indexStar + 1
            : null}
        </p>
      </div>
      {starsClicked.indexStar !== null && (
        <button
          className="w-full text-center bg-fuchsia-100 text-black p-3 my-3 rounded-lg cursor-pointer duration-500 hover:bg-fuchsia-200"
          onClick={() =>
            addSelectedMovieToWatchedMovies(
              watchedMovies,
              selectedMovie,
              starsClicked
            )
          }
        >
          ➕ Add To Watching List
        </button>
      )}
    </div>
  );
}
