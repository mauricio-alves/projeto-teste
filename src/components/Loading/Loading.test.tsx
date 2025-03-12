import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom/vitest";
import { Loading } from "./Loading"; 

describe("Componente Loading", () => {
  it("Deve renderizar o texto 'Carregando...'", () => {
    render(<Loading />);

    const loadingText = screen.getByText(/carregando.../i);
    expect(loadingText).toBeInTheDocument();
  });
});
