/* eslint-disable testing-library/no-wait-for-multiple-assertions */
import { BrowserRouter } from 'react-router-dom';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { SignInMutation } from 'gql/graphql';
import SignIn from 'pages/SignIn/SignIn';
import * as toastify from 'react-toastify';
import { signInSnapshot } from './SignInSnapshot';
import { SIGN_IN } from 'gql-store';

const displayNavbar = () => {
  return false;
};

jest.mock('react-toastify');

const renderSignIn = (
  mocks: MockedResponse<SignInMutation>[] = [],
  onSuccess: jest.Mock<any, any, any>
) => {
  return render(
    <MockedProvider mocks={mocks}>
      <div data-testid="wrapper">
        <SignIn displayNavbar={displayNavbar} onSuccess={onSuccess} />
      </div>
    </MockedProvider>,
    { wrapper: BrowserRouter }
  );
};

const fillFormAndSubmit = () => {
  fireEvent.change(screen.getByRole('textbox', { name: /Adresse email/i }), {
    target: { value: 'jeanjean@email.com' },
  });
  fireEvent.change(screen.getByLabelText(/Mot de passe/i), {
    target: { value: 'Jeanjeanbon1!' },
  });
  fireEvent.submit(screen.getByRole('form'));
};

describe('SignIn :', () => {
  describe('When the app mount SignIn component', () => {
    it('renders correctly', () => {
      const onSuccess = jest.fn();
      renderSignIn([], onSuccess);

      expect(screen.getByTestId('wrapper')).toMatchInlineSnapshot(
        signInSnapshot
      );
    });
  });

  describe('When SignIn form is submited with fields filled-in', () => {
    describe('when server respond with success', () => {
      const mockSignInSuccess: MockedResponse<SignInMutation> = {
        request: {
          query: SIGN_IN,
          variables: {
            emailAddress: 'jeanjean@email.com',
            password: 'Jeanjeanbon1!',
          },
        },
        result: {
          data: {
            signIn: {
              emailAddress: 'jeanjean@email.com',
              id: '1234',
              firstName: 'Jeanjean',
              lastName: 'Bon',
            },
          },
        },
      };
      it('shows toast with success message', async () => {
        const onSuccess = jest.fn();
        renderSignIn([mockSignInSuccess], onSuccess);
        fillFormAndSubmit();

        await waitFor(() => {
          expect(toastify.toast.success).toHaveBeenCalledTimes(1);
          expect(toastify.toast.success).toHaveBeenCalledWith(
            'Vous vous êtes connecté avec succès.'
          );
        });
      });
    });

    describe('When server respond with error', () => {
      const ERROR_MESSAGE = 'ERROR_MESSAGE';
      const mockSignInError: MockedResponse<SignInMutation> = {
        request: {
          query: SIGN_IN,
          variables: {
            emailAddress: 'jeanjean@email.com',
            password: 'Jeanjeanbon1!',
          },
        },
        error: new Error(ERROR_MESSAGE),
      };

      it('shows toast with error message', async () => {
        const onSuccess = jest.fn();
        renderSignIn([mockSignInError], onSuccess);
        fillFormAndSubmit();

        await waitFor(() => {
          expect(toastify.toast.error).toHaveBeenCalledTimes(1);
          expect(toastify.toast.error).toHaveBeenCalledWith(ERROR_MESSAGE);
        });
      });
    });
  });
});
