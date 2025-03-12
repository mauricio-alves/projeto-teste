import { render, screen } from "@testing-library/react";
import { Card } from "./Card"; // Ajuste o caminho de importação conforme necessário
import { Movie } from "../../interfaces/movie";
import { MemoryRouter } from "react-router-dom";

const movieMock: Movie = {
  id: 1,
  original_title: "Título do Filme",
  overview: "Descrição do filme.",
  backdrop_path: "/caminho/da/imagem.jpg",
  poster_path: "/caminho/da/imagem.jpg",
  release_date: "2021-01-01",
  vote_average: 10,
  homepage: "https://example.com",
};

describe("Card", () => {
  it("Deve renderizar o título do filme", () => {
    render(
      <MemoryRouter>
        <Card movie={movieMock} />
      </MemoryRouter>
    );

    const titleElement = screen.getByText(movieMock.original_title);
    expect(titleElement).toBeInTheDocument();
  });

  it("Deve renderizar a imagem do filme com o src correto", () => {
    render(
      <MemoryRouter>
        <Card movie={movieMock} />
      </MemoryRouter>
    );

    const imageElement = screen.getByAltText("movie poster");
    expect(imageElement).toHaveAttribute(
      "src",
      `https://image.tmdb.org/t/p/w500${movieMock.backdrop_path}`
    );
  });

  it("Deve renderizar o botão 'Saiba mais' dentro de um Link", () => {
    render(
      <MemoryRouter>
        <Card movie={movieMock} />
      </MemoryRouter>
    );

    const buttonElement = screen.getByText(/saiba mais/i);
    expect(buttonElement).toBeInTheDocument();
    const linkElement = screen.getByRole("link");
    expect(linkElement).toHaveAttribute("href", `/details/${movieMock.id}`);
  });
});
