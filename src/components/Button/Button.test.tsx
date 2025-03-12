import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom/vitest";
import { Button } from "./Button";

describe("Button Component", () => {
  it("Deve renderizar o botão com o texto children", () => {
    render(<Button>Click me</Button>);

    const button = screen.getByText(/click me/i);
    expect(button).toBeInTheDocument();
  });
});
