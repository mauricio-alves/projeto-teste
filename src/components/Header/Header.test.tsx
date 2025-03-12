import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Header } from "./Header";

describe("Header Component", () => {
  test("Deve renderizar o título corretamente", () => {
    render(<Header />);

    const titleElement = screen.getByText(/Projeto Teste - React TS/i);
    expect(titleElement).toBeInTheDocument();
  });

  test("Deve renderizar a logo corretamente", () => {
    render(<Header />);

    const logoElement = screen.getByAltText("vite logo");
    expect(logoElement).toBeInTheDocument();
    expect(logoElement).toHaveAttribute("src", "/vite.svg");
  });

  test("O link da logo deve apontar para a página inicial", () => {
    render(<Header />);
    
    const linkElement = screen.getByRole("link", { name: /vite logo/i });
    expect(linkElement).toHaveAttribute("href", "/");
  });
});
