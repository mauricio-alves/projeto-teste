import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom/vitest";
import { Search } from "./Search";
import { useState } from "react";

describe("Componente Search", () => {
  it("Deve renderizar o campo de busca corretamente", () => {
    render(<Search search="" setSearch={() => {}} />);

    const inputElement = screen.getByPlaceholderText(
      /procurar filme pelo nome/i
    );
    expect(inputElement).toBeInTheDocument();
  });

  it("Deve atualizar o valor de 'search' quando o usuário digitar", () => {
    const TestWrapper = () => {
      const [search, setSearch] = useState<string>("");
      return <Search search={search} setSearch={setSearch} />;
    };

    render(<TestWrapper />);

    const inputElement = screen.getByPlaceholderText(
      /procurar filme pelo nome/i
    );
    fireEvent.change(inputElement, { target: { value: "Harry Potter" } });
    expect(inputElement).toHaveValue("Harry Potter");
  });

  it("Deve ter o ícone de pesquisa visível", () => {
    render(<Search search="" setSearch={() => {}} />);

    const searchIcon = screen.getByTestId("search-icon");
    expect(searchIcon).toBeInTheDocument();
  });
});
