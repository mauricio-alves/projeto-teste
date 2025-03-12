import { render, screen } from "@testing-library/react";
import { Footer } from "./Footer"; // Ajuste o caminho de importação conforme necessário

describe("Footer", () => {
  test("Deve renderizar o texto 'Desenvolvido por'", () => {
    render(<Footer />);

    const textElement = screen.getByText(/desenvolvido por/i);
    expect(textElement).toBeInTheDocument();
  });

  test("Deve renderizar o link com o nome 'Maurício Alves ❤️'", () => {
    render(<Footer />);
    
    const linkElement = screen.getByText(/Maurício Alves ❤️/i);
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute(
      "href",
      "https://github.com/mauricio-alves"
    );
  });
});
