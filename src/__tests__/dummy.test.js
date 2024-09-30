/* eslint-disable no-undef */
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom"
import App from "../App";

test('App component renders', () => {
    render(<App/>)
    expect(screen.queryByText("Hello world")).toBeInTheDocument;
})
