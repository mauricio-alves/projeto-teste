import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import axios from "axios";
import { Details } from "./Details";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import "@testing-library/jest-dom/vitest";

// Mock dos componentes
vi.mock("../../components/Loading", () => ({
  Loading: () => (
    <div>
      <h2>Carregando...</h2>
    </div>
  ),
}));

vi.mock("../../components/Button", () => ({
  Button: ({ children }: { children: React.ReactNode }) => (
    <button>{children}</button>
  ),
}));

// Mock do axios
vi.mock("axios");
const mockedAxios = axios as vi.Mocked<typeof axios>;

describe("Details Page", () => {
  const mockMovie = {
    id: 1,
    original_title: "Filme de Teste",
    poster_path: "/caminho/para/poster.jpg",
    release_date: "2023-10-01",
    overview: "Este é um filme de teste.",
    vote_average: 8.5,
    homepage: "https://exemplo.com",
    runtime: 120,
  };

  beforeEach(() => {
    // Mock da resposta da API
    mockedAxios.get.mockResolvedValueOnce({
      data: mockMovie,
      status: 200,
      statusText: "OK",
      headers: {},
      config: {
        url: `https://api.themoviedb.org/3/movie/${mockMovie.id}`,
      },
    });
  });

  afterEach(() => {
    // Limpa os mocks após cada teste
    vi.clearAllMocks();
  });

  it("Deve exibir o estado de carregamento inicialmente", async () => {
    render(
      <MemoryRouter initialEntries={[`/details/${mockMovie.id}`]}>
        <Routes>
          <Route path="/details/:id" element={<Details />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("Carregando...")).toBeInTheDocument();

    await waitFor(() => expect(mockedAxios.get).toHaveBeenCalledTimes(1));
  });

  it("Deve renderizar os detalhes do filme após o carregamento", async () => {
    render(
      <MemoryRouter initialEntries={[`/details/${mockMovie.id}`]}>
        <Routes>
          <Route path="/details/:id" element={<Details />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() =>
      expect(screen.getByText(mockMovie.original_title)).toBeInTheDocument()
    );

    expect(
      screen.getByText(`${mockMovie.runtime} min | ${mockMovie.release_date.split("-")[0]}`)
    ).toBeInTheDocument();
    expect(screen.getByText(mockMovie.overview)).toBeInTheDocument();
    expect(
      screen.getByText(`Nota: ${mockMovie.vote_average}`)
    ).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute(
      "src",
      `https://image.tmdb.org/t/p/w500${mockMovie.poster_path}`
    );
  });

  it("Deve exibir o botão 'ASSISTIR' com o link correto", async () => {
    render(
      <MemoryRouter initialEntries={[`/details/${mockMovie.id}`]}>
        <Routes>
          <Route path="/details/:id" element={<Details />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() =>
      expect(screen.getByText(mockMovie.original_title)).toBeInTheDocument()
    );

    const assistirButton = screen.getByRole("button", { name: /ASSISTIR/i });
    expect(assistirButton).toBeInTheDocument();
    expect(assistirButton.closest("a")).toHaveAttribute(
      "href",
      mockMovie.homepage
    );
  });
});
