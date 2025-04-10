export default function AllMovies({
  movies,
  loading,
  error,
  search,
  setSelectedMovieId,
}) {
  let dataSearchMovies = () => {
    if (search) {
      return movies.filter((movie) =>
        movie.primaryTitle.toLowerCase().includes(search.toLowerCase())
      );
    } else return movies;
  };

  return (
    <div className="w-full lg:w-1/2 bg-fuchsia-950/40 flex flex-wrap justify-center p-4 rounded-lg shadow-md">
      {error && (
        <h1 className="text-bold text-fuchsia-50 text-lg">Error: {error}</h1>
      )}

      {loading && (
        <h1 className="text-bold text-fuchsia-50 text-lg"> Loading... </h1>
      )}
      {dataSearchMovies().length > 0 &&
        dataSearchMovies().map((movie, index) => {
          {
            return (
              index < 30 && (
                <div
                  key={movie.id}
                  className="w-full flex align-center card bg-fuchsia-100 rounded-lg shadow-md my-1 cursor-pointer h-25"
                  onClick={() => setSelectedMovieId(movie.id)}
                >
                  <img
                    src={movie.primaryImage}
                    alt={movie.primaryTitle}
                    className="w-30 h-full "
                  />
                  <div className="p-4">
                    <h1 className=" text-lg font-bold">
                      {" "}
                      {movie.primaryTitle}{" "}
                    </h1>
                    <p className="text-gray-600 text-sm font-600">
                      🗓️ {movie.startYear}
                    </p>
                  </div>
                </div>
              )
            );
          }
        })}

      {search.length > 0 && dataSearchMovies().length === 0 && (
        <p className="text-bold text-fuchsia-50 text-l">
          ❌ Opps Not Founding{" "}
        </p>
      )}
    </div>
  );
}
