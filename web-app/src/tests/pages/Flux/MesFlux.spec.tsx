/* eslint-disable testing-library/no-wait-for-multiple-assertions */
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { AddFlowMutation, DeleteFlowMutation } from 'gql/graphql';
import MesFlux, { ADD_FLOW, DELETE_FLOW } from 'pages/MesFlux/MesFlux';
import * as toastify from 'react-toastify';

jest.mock('react-toastify');

const data = {
  myProfile: {
    id: '1000',
    firstName: 'Harry',
    flows: [
      {
        flowName: 'Le camion vert',
        id: 'f4-3535g',
        urlId: 3,
        tickets: [
          {
            __typename: 'Ticket',
            orderNumber: 2052,
          },
          {
            __typename: 'Ticket',
            orderNumber: 2053,
          },
        ],
      },
    ],
  },
};

const fillFormForAddFluAndSubmit = () => {
  fireEvent.click(screen.getByRole('button', { name: /Ajouter un flu/i }));
  fireEvent.change(screen.getByLabelText('Nom'), {
    target: { value: 'Taverne de Hagrid' },
  });
  fireEvent.click(screen.getByRole('button', { name: /Confirmer/i }));
};

const ActionForDeleteAndSubmit = () => {
  fireEvent.click(screen.getByRole('checkbox'));
  fireEvent.click(screen.getByRole('button', { name: /Supprimer/i }));
  fireEvent.click(screen.getByRole('button', { name: /Confirmer/i }));
};

const renderMesFlux = (
  mocks: MockedResponse<AddFlowMutation | DeleteFlowMutation>[] = [],
  refetch: jest.Mock<any, any, any>
) => {
  return render(
    <MockedProvider mocks={mocks}>
      <MesFlux data={data} refetch={refetch} />
    </MockedProvider>
  );
};

describe('When MesFlux form for add a new flux is submited', () => {
  describe('When server respond with success', () => {
    const mockAddFlowSuccess: MockedResponse<AddFlowMutation> = {
      request: {
        query: ADD_FLOW,
        variables: {
          id: '1000',
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
    it('shows toast with success message', async () => {
      const refetch = jest.fn();
      renderMesFlux([mockAddFlowSuccess], refetch);
      fillFormForAddFluAndSubmit();

      await waitFor(() => {
        expect(toastify.toast.success).toHaveBeenCalledTimes(1);
        expect(toastify.toast.success).toHaveBeenCalledWith('Creation reussi.');
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
          id: '1000',
          flowName: 'Taverne de Hagrid',
        },
      },
      error: new Error(ERROR_MESSAGE),
    };

    it('shows toast with error message', async () => {
      const refetch = jest.fn();
      renderMesFlux([mockAddFlowError], refetch);
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
          arrayId: ['8888'],
        },
      },
      result: {
        data: {
          deleteFlow: 1,
        },
      },
    };
    it('show toast with success message', async () => {
      const refetch = jest.fn();
      renderMesFlux([mockDeleteSuccess], refetch);
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
          arrayId: ['8888'],
        },
      },
      error: new Error(ERROR_MESSAGE),
    };

    it('shows toast with error message', async () => {
      const refetch = jest.fn();
      renderMesFlux([mockDeletedError], refetch);
      ActionForDeleteAndSubmit();

      await waitFor(() => {
        expect(toastify.toast.error).toHaveBeenCalledTimes(1);
        expect(toastify.toast.error).toHaveBeenCalledWith(ERROR_MESSAGE);
      });
    });
  });
});
