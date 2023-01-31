import { BrowserRouter } from "react-router-dom";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { SignUpMutation } from "gql/graphql";
import SignUp, { SIGN_UP } from "pages/SignUp/SignUp";
import * as toastify from "react-toastify";
import { signUpSnapshot } from "./SignUpSnapshot";

const displayNavbar = () => {
  return false;
};

jest.mock("react-toastify");

const renderSignUp = (mocks: MockedResponse<SignUpMutation>[] = []) => {
  return render(
    <MockedProvider mocks={mocks}>
      <div data-testid="wrapper">
        <SignUp displayNavbar={displayNavbar} />
      </div>
    </MockedProvider>,
    { wrapper: BrowserRouter }
  );
};

const fillFormAndSubmit = () => {
  fireEvent.change(screen.getByRole("textbox", { name: "Prénom" }), {
    target: { value: "Hermione" },
  });
  fireEvent.change(screen.getByRole("textbox", { name: "Nom" }), {
    target: { value: "Granger" },
  });
  fireEvent.change(screen.getByRole("textbox", { name: "Adresse email" }), {
    target: { value: "hermionegranger@email.com" },
  });
  fireEvent.change(screen.getByLabelText(/Mot de passe/i), {
    target: { value: "Hermionegranger1!" },
  });
  fireEvent.change(screen.getByLabelText(/Confirmer le mot de passe/i), {
    target: { value: "Hermionegranger1!" },
  });
  fireEvent.submit(screen.getByRole("form"));
};

describe("When the app mount SignUp component", () => {
  it("renders correctly", () => {
    renderSignUp();
    expect(screen.getByTestId("wrapper")).toMatchInlineSnapshot(signUpSnapshot);
  });
});

