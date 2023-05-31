import React from "react";
import { render } from "@testing-library/react";
import LoginForm from "../forms/LoginForm";

it("renders without crashing", function () {
    render(<LoginForm />);
});

it("matches snapshot with no jobs", function () {
    const { asFragment } = render(<LoginForm />);
    expect(asFragment()).toMatchSnapshot();
});