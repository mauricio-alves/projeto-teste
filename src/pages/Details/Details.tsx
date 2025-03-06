import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Movie } from "../../interfaces/movie";
import axios from "axios";
import { Loading } from "../../components/Loading";
import { Button } from "../../components/Button";

export function Details() {
  const { id } = useParams();
  const [movie, setMovie] = useState<Movie>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getMovie() {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${
            import.meta.env.VITE_API_KEY
          }`
        );
        setMovie(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
    getMovie();
  }, [id]);

  return loading ? (
    <Loading />
  ) : (
    <>
      <div className="grid place-items-center font-mono mt-30 mb-30">
        <div className="rounded-md shadow-lg bg-gray-900 p-30">
          <div className="md:flex px-4 leading-none max-w-4xl gap-5">
            <div className="flex-none ">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
                alt="pic"
                className="h-72 w-56 rounded-md shadow-2xl transform -translate-y-4 border-4 border-gray-300"
              />
            </div>
            <div className="flex-col text-gray-300">
              <p className="pt-4 text-2xl font-bold">{movie?.original_title}</p>
              <hr className="hr-text" data-content="" />
              <div className="text-md flex justify-between px-4 my-2">
                <span className="font-bold">
                  2h 2min | {movie?.release_date?.split("-")[0]}
                </span>
                <span className="font-bold"></span>
              </div>
              <p className="hidden md:block px-4 my-4 text-sm text-left">
                {movie?.overview}
              </p>
              <p className="flex text-md px-4 my-2">
                Nota: {(movie?.vote_average || 0).toFixed(1)}
              </p>
              <div className="text-xs">
                <a href={movie?.homepage} target="_blank" rel="noreferrer">
                  <Button>ASSISTIR</Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
