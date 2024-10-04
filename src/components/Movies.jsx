import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { HashLoader } from "react-spinners";
import useDebounce from "../hooks/useDebounce";
import MovieCard from "./MovieCard";
import Button from "./common/Button";
import useMovieStore from "../stores/useMovieStore";

async function getMovies(term) {
  const apiKey = import.meta.env.VITE_OMDB_API_KEY;
  const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${term}`;
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Failed to fetch movies, Try again later");
  }

  return res.json();
}

const loaderStyles = {
  display: "block",
  marginInline: "auto",
  marginTop: "2.5rem",
};

function Movies() {
  // Temporary movie name controlling the input
  const [tempMovieName, setTempMovieName] = useState("");

  // Debouncing the temporary movie name
  const debouncedName = useDebounce(tempMovieName, 400);

  // Get the movie name from zustand store and it's setter function
  const { movieName, setMovieName } = useMovieStore();

  // update movieName in Zustand
  function handleClick(e) {
    e.preventDefault();
    if (debouncedName) {
      // Update the movie name in useMovieStore to the debounced vale
      setMovieName(debouncedName.toLowerCase().split(" ").join("+"));
      // clear the input
      setTempMovieName("");
    }
  }

  // use movie name from useMovieStore to make API calls
  const { data, error, isSuccess, isError, isLoading } = useQuery({
    queryKey: ["movies", movieName],
    queryFn: () => getMovies(movieName),
    /* Only fetch when movieName is truthy */
    enabled: Boolean(movieName),
    /* consider data fresh for 5 minutes before refetching */
    staleTime: 300000,
  });

  if (isSuccess) {
    console.log("Success: ", data);
  }

  if (error) {
    console.error("Error: ", error);
  }

  return (
    <section className="min-h-screen">
      <h2 className="text-darkBlue text-lg px-2  sm:text-28 font-roboto uppercase font-bold text-center mt-5">
        Click movie tile to view more details
      </h2>
      <form
        className="flex flex-col sm:flex-row mt-4 justify-center gap-4 w-4/5 mx-auto"
        autoComplete="off"
      >
        <input
          type="text"
          name="searchterm"
          value={tempMovieName}
          onChange={(e) => setTempMovieName(e.target.value)}
          placeholder="Search movie by name..."
          className="text-night text-lg py-3 pl-3 sm:py-3 sm:px-4 outline-none focus:shadow-md rounded font-semibold"
        />
        <Button
          type="submit"
          handleClick={handleClick}
          moreStyles="font-bold px-14  py-2 text-xl rounded active:scale-95 mx-auto  sm:mx-0 tracking-wide"
        >
          Search
        </Button>
      </form>

      {isLoading && (
        <HashLoader cssOverride={loaderStyles} color="#0B2545" size={35} />
      )}

      {isError && (
        <h2 className="text-tomato text-base sm:text-lg uppercase font-bold text-center mt-8">
          Failed to fetch movie, try again later!
        </h2>
      )}

      {data?.Error && (
        <h2 className="text-tomato text-base sm:text-ld uppercase font-bold text-center mt-8">
          Couldn&apos;t find movie, try another!
        </h2>
      )}

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10 justify-center mx-auto my-12 w-4/5">
        {data?.Search &&
          data.Search.map((movie) => (
            <MovieCard
              key={movie.imdbID}
              movieId={movie.imdbID}
              poster={movie.Poster}
              title={movie.Title}
              year={movie.Year.slice(0, 4)}
            />
          ))}
      </div>
    </section>
  );
}

export default Movies;
