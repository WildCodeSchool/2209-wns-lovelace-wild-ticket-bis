/* eslint-disable testing-library/no-wait-for-multiple-assertions */
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { AddFlowMutation, DeleteFlowMutation } from 'gql/graphql';
import MesFlux, { ADD_FLOW } from 'pages/MesFlux/MesFlux';
import * as toastify from 'react-toastify';

jest.mock('react-toastify');

const data = {
  myProfile: {
    id: '1000',
    firstName: 'Harry',
    flows: [
      {
        flowName: 'Le camion vert',
        id: '8888',
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

const fillFormAndSubmit = () => {
  fireEvent.click(screen.getByRole('button', { name: /Ajouter un flu/i }));
  fireEvent.change(screen.getByLabelText('Nom'), {
    target: { value: 'Taverne de Hagrid' },
  });
  fireEvent.click(screen.getByRole('button', { name: /Confirmer/i }));
};

const renderMesFlux = (mocks: MockedResponse<AddFlowMutation>[] = []) => {
  return render(
    <MockedProvider mocks={mocks}>
      <MesFlux data={data} />
    </MockedProvider>
  );
};

describe('When MesFlux form is submited', () => {
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
      renderMesFlux([mockAddFlowSuccess]);
      fillFormAndSubmit();
      await waitFor(() => {
        expect(toastify.toast.success).toHaveBeenCalledTimes(1);
        expect(toastify.toast.success).toHaveBeenCalledWith('Creation reussi.');
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
      renderMesFlux([mockAddFlowError]);
      fillFormAndSubmit();

      await waitFor(() => {
        expect(toastify.toast.error).toHaveBeenCalledTimes(1);
        expect(toastify.toast.error).toHaveBeenCalledWith(ERROR_MESSAGE);
      });
    });
  });
});
