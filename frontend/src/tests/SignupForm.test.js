import React from "react";
import { render } from "@testing-library/react";
import SignupForm from "../forms/SignupForm";

it("renders without crashing", function () {
    render(<SignupForm />);
});

it("matches snapshot with no jobs", function () {
    const { asFragment } = render(<SignupForm />);
    expect(asFragment()).toMatchSnapshot();
});