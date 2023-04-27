/* eslint-disable testing-library/no-wait-for-multiple-assertions */
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { AppContext } from 'context/AppContext';
import {
  AddFlowMutation,
  DeleteFlowMutation,
  MyprofileQuery,
} from 'gql/graphql';
import MesFlux, { ADD_FLOW, DELETE_FLOW } from 'pages/MesFlux/MesFlux';
import * as toastify from 'react-toastify';

jest.mock('react-toastify');

const fillFormForAddFluAndSubmit = () => {
  fireEvent.click(screen.getByRole('button', { name: /Ajouter un flu/i }));
  fireEvent.change(screen.getByLabelText('Nom'), {
    target: { value: 'Taverne de Hagrid' },
  });
  fireEvent.click(screen.getByRole('button', { name: /Confirmer/i }));
};

const ActionForDeleteAndSubmit = () => {
  fireEvent.click(screen.getByTestId('Le camion vert'));
  fireEvent.click(screen.getByRole('button', { name: /Supprimer/i }));
  fireEvent.click(screen.getByRole('button', { name: /Confirmer/i }));
};

const renderMesFlux = (
  mocks: MockedResponse<
    AddFlowMutation | DeleteFlowMutation | MyprofileQuery
  >[] = [],
  providerProps: any
) => {
  return render(
    <MockedProvider mocks={mocks}>
      <AppContext.Provider value={{ ...providerProps }}>
        <MesFlux />
      </AppContext.Provider>
    </MockedProvider>
  );
};

describe('Mes FLux :', () => {
  describe('When MesFlux form for add a new flux is submited', () => {
    describe('When server respond with success', () => {
      const mockAddFlowSuccess: MockedResponse<AddFlowMutation> = {
        request: {
          query: ADD_FLOW,
          variables: {
            id: '9d194517-b995-496c-a6c2-0568e9e47b7c',
            flowName: 'Taverne de Hagrid',
          },
        },
        result: {
          data: {
            addFlow: {
              flowName: 'Taverne de Hagrid',
              id: '9999',
            },
          },
        },
      };
      const userProfile = {
        myProfile: {
          id: '9d194517-b995-496c-a6c2-0568e9e47b7c',
          firstName: 'Harry',
          flows: [
            {
              flowName: 'Le camion vert',
              id: '86b13f3f-389d-4c4b-b50a-fd00a484673c',
            },
            {
              flowName: "Pas d'idée de nom",
              id: 'f4be2425-6f79-4e09-b8c1-9c24f611c896',
            },
          ],
        },
      };
      it('shows toast with success message', async () => {
        const refetch = jest.fn();
        const providerProps = { userProfile, refetch };
        renderMesFlux([mockAddFlowSuccess], providerProps);
        fillFormForAddFluAndSubmit();

        await waitFor(() => {
          expect(toastify.toast.success).toHaveBeenCalledTimes(1);
          expect(toastify.toast.success).toHaveBeenCalledWith(
            'Creation reussi.'
          );
          expect(refetch).toHaveBeenCalledTimes(1);
        });
      });
    });
    describe('When server respond with error', () => {
      const ERROR_MESSAGE = 'ERROR_MESSAGE';
      const mockAddFlowError: MockedResponse<AddFlowMutation> = {
        request: {
          query: ADD_FLOW,
          variables: {
            id: '9d194517-b995-496c-a6c2-0568e9e47b7c',
            flowName: 'Taverne de Hagrid',
          },
        },
        error: new Error(ERROR_MESSAGE),
      };
      const userProfile = {
        myProfile: {
          id: '9d194517-b995-496c-a6c2-0568e9e47b7c',
          firstName: 'Harry',
          flows: [
            {
              flowName: 'Le camion vert',
              id: '86b13f3f-389d-4c4b-b50a-fd00a484673c',
            },
            {
              flowName: "Pas d'idée de nom",
              id: 'f4be2425-6f79-4e09-b8c1-9c24f611c896',
            },
          ],
        },
      };

      it('shows toast with error message', async () => {
        const refetch = jest.fn();
        const providerProps = { userProfile, refetch };
        renderMesFlux([mockAddFlowError], providerProps);
        fillFormForAddFluAndSubmit();

        await waitFor(() => {
          expect(toastify.toast.error).toHaveBeenCalledTimes(1);
          expect(toastify.toast.error).toHaveBeenCalledWith(ERROR_MESSAGE);
        });
      });
    });
  });

  describe('When trying to delete a flu', () => {
    describe('Flu is deleted with success', () => {
      const mockDeleteSuccess: MockedResponse<DeleteFlowMutation> = {
        request: {
          query: DELETE_FLOW,
          variables: {
            arrayId: ['86b13f3f-389d-4c4b-b50a-fd00a484673c'],
          },
        },
        result: {
          data: {
            deleteFlow: 1,
          },
        },
      };

      const userProfile = {
        myProfile: {
          id: '9d194517-b995-496c-a6c2-0568e9e47b7c',
          firstName: 'Harry',
          flows: [
            {
              flowName: 'Le camion vert',
              id: '86b13f3f-389d-4c4b-b50a-fd00a484673c',
            },
            {
              flowName: "Pas d'idée de nom",
              id: 'f4be2425-6f79-4e09-b8c1-9c24f611c896',
            },
          ],
        },
      };

      it('show toast with success message', async () => {
        const refetch = jest.fn();
        const providerProps = { userProfile, refetch };
        renderMesFlux([mockDeleteSuccess], providerProps);
        ActionForDeleteAndSubmit();

        await waitFor(() => {
          expect(toastify.toast.success).toHaveBeenCalledTimes(1);
          expect(toastify.toast.success).toHaveBeenCalledWith(
            'Suppresion reussi.'
          );
          expect(refetch).toHaveBeenCalledTimes(1);
        });
      });
    });
    describe('When server respond with error', () => {
      const ERROR_MESSAGE = 'ERROR_MESSAGE';
      const mockDeletedError: MockedResponse<DeleteFlowMutation> = {
        request: {
          query: DELETE_FLOW,
          variables: {
            arrayId: ['86b13f3f-389d-4c4b-b50a-fd00a484673c'],
          },
        },
        error: new Error(ERROR_MESSAGE),
      };

      const userProfile = {
        myProfile: {
          id: '9d194517-b995-496c-a6c2-0568e9e47b7c',
          firstName: 'Harry',
          flows: [
            {
              flowName: 'Le camion vert',
              id: '86b13f3f-389d-4c4b-b50a-fd00a484673c',
            },
            {
              flowName: "Pas d'idée de nom",
              id: 'f4be2425-6f79-4e09-b8c1-9c24f611c896',
            },
          ],
        },
      };

      it('shows toast with error message', async () => {
        const refetch = jest.fn();
        const providerProps = { userProfile, refetch };
        renderMesFlux([mockDeletedError], providerProps);
        ActionForDeleteAndSubmit();

        await waitFor(() => {
          expect(toastify.toast.error).toHaveBeenCalledTimes(1);
          expect(toastify.toast.error).toHaveBeenCalledWith(ERROR_MESSAGE);
        });
      });
    });
  });
});
