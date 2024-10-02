/* eslint-disable react/prop-types */

function MovieCard({ poster, title, year }) {
  return (
    <article className="bg-night rounded-md text-white flex flex-col hover:scale-105">
      <img src={poster} alt={title} className="rounded-md  h-330 object-center" />

      <div className="flex items-start justify-between gap-3 font-semibold text-base">
        <p className="p-4">{title}</p>
        <p className="p-4">{year}</p>
      </div>
    </article>
  );
}

export default MovieCard;
