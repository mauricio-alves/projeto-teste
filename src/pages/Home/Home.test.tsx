import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import "@testing-library/jest-dom/vitest";
import axios from "axios";
import { Home } from "./Home";

// Mock dos componentes
vi.mock("../../components/Loading", () => ({
  Loading: () => (
    <div>
      <h2>Carregando...</h2>
    </div>
  ),
}));

vi.mock("../../components/Search", () => ({
  Search: ({
    search,
    setSearch,
  }: {
    search: string;
    setSearch: (value: string) => void;
  }) => (
    <input
      type="text"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      placeholder="Procurar filme pelo nome..."
      data-testid="input-search"
    />
  ),
}));

vi.mock("../../components/Card", () => ({
  Card: ({ movie }: { movie: { id: number; original_title: string } }) => (
    <div>{movie.original_title}</div>
  ),
}));

// Mock do axios
vi.mock("axios");
const mockedAxios = axios as vi.Mocked<typeof axios>;

describe("Home Page", () => {
  const mockMovies = [
    { id: 1, original_title: "Filme 1" },
    { id: 2, original_title: "Filme 2" },
    { id: 3, original_title: "Outro Filme" },
  ];

  beforeEach(() => {
    // Mock da resposta da API
    mockedAxios.get.mockResolvedValueOnce({
      data: { results: mockMovies },
      status: 200,
      statusText: "OK",
      headers: {},
      config: {
        url: "https://api.themoviedb.org/3/discover/movie",
      },
    });
  });

  afterEach(() => {
    // Limpa os mocks após cada teste
    vi.clearAllMocks();
  });

  it("Deve exibir o estado de carregamento inicialmente", async () => {
    render(<Home />);

    expect(screen.getByText("Carregando...")).toBeInTheDocument();
    await waitFor(() => expect(mockedAxios.get).toHaveBeenCalledTimes(1));
  });

  it("Deve renderizar os filmes após o carregamento", async () => {
    render(<Home />);

    await waitFor(() =>
      expect(screen.getByText("Filme 1")).toBeInTheDocument()
    );
    expect(screen.getByText("Filme 2")).toBeInTheDocument();
    expect(screen.getByText("Outro Filme")).toBeInTheDocument();
  });

  it("Deve filtrar os filmes com base no termo de busca", async () => {
    render(<Home />);

    await waitFor(() =>
      expect(screen.getByText("Filme 1")).toBeInTheDocument()
    );

    const searchInput = screen.getByTestId("input-search") as HTMLInputElement;
    fireEvent.change(searchInput, { target: { value: "Filme" } });

    await waitFor(() => {
      expect(screen.getByText("Filme 1")).toBeInTheDocument();
      expect(screen.getByText("Filme 2")).toBeInTheDocument();
      // expect(screen.queryByText("Outro Filme")).not.toBeInTheDocument();
    });
  });

  it("Não deve exibir filmes quando o termo de busca não corresponde a nenhum filme", async () => {
    render(<Home />);

    await waitFor(() =>
      expect(screen.getByText("Filme 1")).toBeInTheDocument()
    );

    const searchInput = screen.getByPlaceholderText(
      "Procurar filme pelo nome..."
    );
    fireEvent.change(searchInput, { target: { value: "Inexistente" } });
    expect(screen.queryByText("Filme 1")).not.toBeInTheDocument();
    expect(screen.queryByText("Filme 2")).not.toBeInTheDocument();
    expect(screen.queryByText("Outro Filme")).not.toBeInTheDocument();
  });
});
