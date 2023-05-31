import React from "react";
import { render } from "@testing-library/react";
import SearchForm from "../forms/SearchForm";

it("renders without crashing", function () {
    render(<SearchForm />);
});

it("matches snapshot with no jobs", function () {
    const { asFragment } = render(<SearchForm />);
    expect(asFragment()).toMatchSnapshot();
});