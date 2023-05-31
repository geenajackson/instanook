import React from "react";
import { render } from "@testing-library/react";
import ListingList from "../components/ListingList";

it("renders without crashing", function () {
    render(<ListingList />);
});

it("matches snapshot with no jobs", function () {
    const { asFragment } = render(<ListingList />);
    expect(asFragment()).toMatchSnapshot();
});