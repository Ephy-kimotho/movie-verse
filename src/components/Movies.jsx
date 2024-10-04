import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { HashLoader } from "react-spinners";
import useDebounce from "../hooks/useDebounce";
import MovieCard from "./MovieCard";
import Button from "./common/Button";
import useMovieStore from "../stores/useMovieStore";

async function getMovies(term) {
  const apiKey = import.meta.env.VITE_OMDB_API_KEY;
  term = term.toLowerCase().split(" ").join("+");
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
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedValue = useDebounce(searchTerm, 500);
  const { searchQuery, setSearchQuery } = useMovieStore();

  const { data, isError, isLoading } = useQuery({
    queryKey: ["movies", searchQuery],
    queryFn: () => getMovies(searchQuery),
    enabled: Boolean(searchQuery),
  });

  function handleClick(e) {
    e.preventDefault();
    if (debouncedValue) {
      setSearchQuery(debouncedValue);
    }
    setSearchTerm("");
  }

  return (
    <section className="min-h-screen">
      <h2 className="text-darkBlue text-lg px-4  sm:text-28 font-roboto uppercase font-bold text-center mt-5">
        Click movie tile to view more details
      </h2>
      <form
        className="flex flex-col sm:flex-row mt-4 justify-center gap-4 w-4/5 mx-auto"
        autoComplete="off"
      >
        <input
          type="text"
          name="searchterm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search movie by name..."
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
              year={movie.Year}
            />
          ))}
      </div>
    </section>
  );
}

export default Movies;
