import Button from "./common/Button";
import useDebounce from "../hooks/useDebounce";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import MovieCard from "./MovieCard";

async function getMovies(term) {
  const apiKey = import.meta.env.VITE_OMDB_API_KEY;
  term = term.toLowerCase().split(" ").join("+");
  const url = `http://www.omdbapi.com/?apikey=${apiKey}&s=${
    term || "avengers"
  }`;
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Failed to fetch movies, Try again later");
  }

  return res.json();
}

function Movies() {
  const [searchTerm, setSearchTerm] = useState("");
  const [submittedTerm, setSubmittedTerm] = useState("avengers");
  const debouncedValue = useDebounce(searchTerm, 1000);

  const { data, isError, isFetching } = useQuery({
    queryKey: ["movies", submittedTerm],
    queryFn: () => getMovies(submittedTerm),
    enabled: Boolean(submittedTerm),
  });

  function handleClick(e) {
    e.preventDefault();
    if (debouncedValue) {
      setSubmittedTerm(debouncedValue);
    }
    setSearchTerm("");
  }

  return (
    <section className="min-h-screen">
      <form className="flex flex-col sm:flex-row mt-10 justify-center gap-4 w-4/5 mx-auto">
        <input
          type="text"
          name="searchterm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter movie name.."
          className="text-night text-lg py-3 pl-2 sm:py-3 sm:px-4 outline-none focus:shadow-md rounded font-semibold"
        />
        <Button
          type="submit"
          handleClick={handleClick}
          moreStyles="font-bold px-14  py-2 text-xl rounded active:scale-95 mx-auto  sm:mx-0 tracking-wide"
        >
          Search
        </Button>
      </form>
      {isFetching && (
        <h2 className="text-darkBlue text-base sm:text-md uppercase font-bold text-center mt-8">
          Loading movies...
        </h2>
      )}

      {isError && (
        <h2 className="text-tomato text-base sm:text-md uppercase font-bold text-center mt-8">
          Could not find movie, try again later!
        </h2>
      )}

      {data?.Error && (
        <h2 className="text-tomato text-base sm:text-md uppercase font-bold text-center mt-8">
          Movie Not found !
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
              year={movie.Year}
            />
          ))}
      </div>
    </section>
  );
}

export default Movies;
