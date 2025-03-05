import { Search } from "../../components/Search";
import { Card } from "../../components/Card";
import { useEffect, useState } from "react";
import axios from "axios";
import { Movie } from "../../interfaces/movie";

export function Home() {
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    async function getMovies() {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/discover/movie?api_key=${
            import.meta.env.VITE_API_KEY
          }`
        );
        setMovies(response.data.results);
      } catch (error) {
        console.log(error);
      }
    }
    getMovies();
  }, []);

  return (
    <div>
      <div className="">
        <div id="form">
          <h2>Catálogo de Filmes</h2>
          <Search search={search} setSearch={setSearch} />
        </div>
        <div>
          <h3>Quais filmes quer ver?</h3>
          <div className="flex flex-wrap justify-between">
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
