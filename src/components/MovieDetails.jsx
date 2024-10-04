import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { HashLoader } from "react-spinners";
import useMovieStore from "../stores/useMovieStore";

const loaderStyles = {
  display: "block",
  marginInline: "auto",
  marginTop: "2.5rem",
};

function MovieDetails() {
  const { movieId } = useParams();
  const { searchQuery } = useMovieStore();

  async function getMovieInfo() {
    const apiKey = import.meta.env.VITE_OMDB_API_KEY;
    const url = `https://www.omdbapi.com/?apikey=${apiKey}&i=${movieId}`;

    const res = await fetch(url);

    if (!res.ok) {
      throw new Error("Failed to get Movie info, Try again later");
    }

    return res.json();
  }

  const { data, error, isLoading } = useQuery({
    queryKey: ["movies", movieId],
    queryFn: getMovieInfo,
  });

  if (isLoading) {
    return (
      <>
        <h2 className="text-darkBlue text-base sm:text-xl uppercase font-bold text-center mt-8">
          Loading movie info...
        </h2>
        <HashLoader cssOverride={loaderStyles} color="#0B2545" size={50} />
      </>
    );
  }

  if (error) {
    return (
      <div className="mt-10 text-tomato">
        <h2 className="font-bold text-base sm:text-xl">
          Oops! Could not fetch movie info !
        </h2>
        <p className="text-sm sm:text-lg">{error.message}</p>
      </div>
    );
  }
  return (
    <section className=" w-4/5 mx-auto my-5">
      <Link
        to=".."
        relative="path"
        className="mb-2 text-darkBlue cursor-pointer font-bold text-xl hover:underline"
      >
        Back to {searchQuery} movies
      </Link>
      {data && (
        <article className="mt-2">
          <div className="flex flex-col gap-5 sm:flex-row">
            <img
              src={data.Poster}
              alt={data.Title}
              className="h-330 w-330 rounded-md"
            />

            <ul className="list-none sm:grow bg-lightOrange sm:rounded py-7 px-5">
              <li className="text-xl sm:text-2xl font-karla text-night">
                <span className="font-bold italic">Name: </span>
                {data.Title}
              </li>
              <li className="text-xl sm:text-2xl font-karla text-night">
                <span className="font-bold italic">Release year: </span>
                {data.Year}
              </li>
              <li className="text-xl sm:text-2xl font-karla text-night">
                <span className="font-bold italic">Rating: </span>
                {data.imdbRating}
              </li>
              <li className="text-xl sm:text-2xl font-karla text-night">
                <span className="font-bold italic">Genre: </span>
                {data.Genre}
              </li>

              <li className="text-xl sm:text-2xl font-karla text-night">
                <span className="font-bold italic">Type: </span>
                {data.Type}
              </li>

              <li className="text-xl sm:text-2xl font-karla text-night">
                <span className="font-bold italic">Seasons: </span>
                {data.totalSeasons}
              </li>
            </ul>
          </div>

          <p className="bg-lightOrange py-8 px-5 text-night text-xl sm:text-2xl sm:mt-5 sm:rounded">
            <span className="font-bold italic">Plot: </span>
            {data.Plot}
          </p>
        </article>
      )}
    </section>
  );
}

export default MovieDetails;
