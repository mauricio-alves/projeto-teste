import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom/vitest";
import { Footer } from "./Footer";

describe("Footer", () => {
  it("Deve renderizar o texto 'Desenvolvido por'", () => {
    render(<Footer />);

    const textElement = screen.getByText(/desenvolvido por/i);
    expect(textElement).toBeInTheDocument();
  });

  it("Deve renderizar o link com o nome 'Maurício Alves ❤️'", () => {
    render(<Footer />);
    
    const linkElement = screen.getByText(/Maurício Alves ❤️/i);
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute(
      "href",
      "https://github.com/mauricio-alves"
    );
  });
});
