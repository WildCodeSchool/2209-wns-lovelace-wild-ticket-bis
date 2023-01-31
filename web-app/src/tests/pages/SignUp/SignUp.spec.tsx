/* eslint-disable testing-library/no-wait-for-multiple-assertions */
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

const renderSignUp = (
  mocks: MockedResponse<SignUpMutation>[] = [],
  onSuccess: jest.Mock<any, any, any>
) => {
  return render(
    <MockedProvider addTypename={false} mocks={mocks}>
      <div data-testid="wrapper">
        <SignUp displayNavbar={displayNavbar} onSuccess={onSuccess} />
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
  fireEvent.change(screen.getByLabelText("Mot de passe"), {
    target: { value: "Hermionegranger1234@" },
  });
  fireEvent.change(screen.getByLabelText("Confirmer le mot de passe"), {
    target: { value: "Hermionegranger1234@" },
  });
  fireEvent.submit(screen.getByRole("form"));
};

describe("When the app mount SignUp component", () => {
  it("renders correctly", () => {
    const onSuccess = jest.fn();
    renderSignUp([], onSuccess);

    expect(screen.getByTestId("wrapper")).toMatchInlineSnapshot(signUpSnapshot);
  });
});

describe("When SignIn form is submited with fields filled-in", () => {
  describe("When the server respond with success", () => {
    const mockSignUpSuccess: MockedResponse<SignUpMutation> = {
      request: {
        query: SIGN_UP,
        variables: {
          firstName: "Hermione",
          lastName: "Granger",
          emailAddress: "hermionegranger@email.com",
          password: "Hermionegranger1234@",
        },
      },
      result: {
        data: {
          signUp: {
            id: "1234",
            emailAddress: "hermionegranger@email.com",
          },
        },
      },
    };
    it("shows toast with success message", async () => {
      const onSuccess = jest.fn();
      renderSignUp([mockSignUpSuccess], onSuccess);
      fillFormAndSubmit();

      await waitFor(() => {
        expect(toastify.toast.success).toHaveBeenCalledTimes(1);
        expect(toastify.toast.success).toHaveBeenLastCalledWith(
          "Votre compte a été créé avec succès. Vous pouvez maintenant vous connecter."
        );
      });
    });
  });

  describe("When the server respond with error", () => {
    const ERROR_MESSAGE = "ERROR_MESSAGE";

    const mockSignUpError: MockedResponse<SignUpMutation> = {
      request: {
        query: SIGN_UP,
        variables: {
          firstName: "Hermione",
          lastName: "Granger",
          emailAddress: "hermionegranger@email.com",
          password: "Hermione",
        },
      },
      error: new Error(ERROR_MESSAGE),
    };
    it("shows toast with error message", async () => {
      const onSuccess = jest.fn();
      renderSignUp([mockSignUpError], onSuccess);
      fillFormAndSubmit();

      await waitFor(() => {
        expect(toastify.toast.error).toHaveBeenCalledTimes(1);
        expect(toastify.toast.error).toHaveBeenCalledWith(
          "Un problème est survenue. Veuillez réessayer ultérieurement."
        );
      });
    });
  });

  describe("When field password is not equal to field confirm password", () => {
    const fillFormAndSubmitWithAnEqualPasswords = () => {
      fireEvent.change(screen.getByRole("textbox", { name: "Prénom" }), {
        target: { value: "Hermione" },
      });
      fireEvent.change(screen.getByRole("textbox", { name: "Nom" }), {
        target: { value: "Granger" },
      });
      fireEvent.change(screen.getByRole("textbox", { name: "Adresse email" }), {
        target: { value: "hermionegranger@email.com" },
      });
      fireEvent.change(screen.getByLabelText("Mot de passe"), {
        target: { value: "Hermionegranger1!" },
      });
      fireEvent.change(screen.getByLabelText("Confirmer le mot de passe"), {
        target: { value: "LeMotDePasseConfirméEstDifférent" },
      });
      fireEvent.submit(screen.getByRole("form"));
    };

    it("shows toast with warning massage", async () => {
      const onSuccess = jest.fn();
      renderSignUp([], onSuccess);
      fillFormAndSubmitWithAnEqualPasswords();

      await waitFor(() => {
        expect(toastify.toast.warning).toHaveBeenCalledTimes(1);
        expect(toastify.toast.warning).toHaveBeenCalledWith(
          "Confirmation du mot de passe erronée"
        );
      });
    });
  });
});

