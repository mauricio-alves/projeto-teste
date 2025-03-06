import { Link } from "react-router-dom";
import { Movie } from "../../interfaces/movie";
import { Button } from "../Button";

export function Card({ movie }: { movie: Movie }) {
  return (
    <div className="relative flex flex-col bg-white shadow-sm border border-slate-200 rounded-lg w-96">
      <div className="relative h-56 m-2.5 overflow-hidden text-white rounded-md">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
          alt="movie poster"
        />
      </div>
      <div className="p-4">
        <h6 className="mb-2 text-slate-800 text-xl font-semibold">
          {movie.original_title}
        </h6>
        <p className="text-slate-600 leading-normal font-light">
          {movie.overview}
        </p>
      </div>
      <div className="px-4 pb-4 pt-0 mt-2">
        <Link to={`/details/${movie.id}`}>
          <Button>Saiba mais</Button>
        </Link>
      </div>
    </div>
  );
}
