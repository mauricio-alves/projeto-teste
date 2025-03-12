import { Search } from "../../components/Search";
import { Card } from "../../components/Card";
import { useEffect, useState } from "react";
import axios from "axios";
import { Movie } from "../../interfaces/movie";
import { Loading } from "../../components/Loading";

export function Home() {
  const [search, setSearch] = useState<string>("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getMovies() {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/discover/movie?api_key=${
            import.meta.env.VITE_API_KEY
          }`
        );
        setMovies(response.data.results);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    getMovies();
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <div>
      <div>
        <div id="form">
          <h1 className="m-6 text-4xl font-bold text-gray-900">
            Catálogo de Filmes
          </h1>
          <Search search={search} setSearch={setSearch} />
        </div>
        <div>
          <div className="flex flex-wrap justify-center gap-8 mt-8">
            {movies
              .filter((movie) => {
                return movie.original_title
                  .toLowerCase()
                  .includes(search.toLowerCase());
              })
              .map((movie) => {
                return <Card key={movie.id} movie={movie} />;
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
