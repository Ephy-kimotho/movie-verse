/* eslint-disable no-undef */
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import Home from "../components/Home";

describe("Home", () => {
  it("should render Home component", () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toHaveTextContent(/movies/i);

    const getStartedBtn = screen.getByRole("link");
    expect(getStartedBtn).toHaveTextContent(/get started/i);
  });
});
