import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { fireEvent, render, waitFor, screen } from '@testing-library/react';
import { AppContext } from 'context/AppContext';
import {
  AddTicketByFlowIdMutation,
  GetTicketsByFlowIdQuery,
} from 'gql/graphql';
import Tickets, {
  ADD_TICKET_BY_FLOW_ID,
  GET_TICKETS_BY_FLOW_ID,
} from 'pages/Tickets/Tickets';
import { TicketSnapshot } from './TicketSnapshot';

jest.mock('react-toastify');

const clickOnAddTicketButton = () => {
  fireEvent.click(screen.getByRole('button', { name: /Ajouter un ticket/i }));
};

const clickOnQuiChangeStatus = () => {
  fireEvent.click(screen.getByTestId('7d081b08-3b24-4a4a-aa4e-0f983b0f012e'));
};

const renderTickets = async (
  mocks: MockedResponse<
    AddTicketByFlowIdMutation | GetTicketsByFlowIdQuery
  >[] = [],
  providerProps: any
) => {
  return render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <AppContext.Provider value={{ ...providerProps }}>
        <Tickets />
      </AppContext.Provider>
    </MockedProvider>
  );
};

describe('When user click on Add ticket button', () => {
  const mockGetTicketByFlowId: MockedResponse<GetTicketsByFlowIdQuery> = {
    request: {
      query: GET_TICKETS_BY_FLOW_ID,
      variables: {
        flowId: '58eea2d7-5929-4efc-9dfc-374d2b30ee42',
      },
    },
    result: {
      data: {
        getTicketsByFlowId: {
          flowName: 'Le camion vert',
          id: '58eea2d7-5929-4efc-9dfc-374d2b30ee42',
          tickets: [
            {
              date: '2023-03-29T13:00:36.184Z',
              id: '7d081b08-3b24-4a4a-aa4e-0f983b0f012e',
              isTrash: false,
              status: 'Ticket non scanné',
            },
            {
              date: '2023-03-29T14:06:21.209Z',
              id: '992146a1-7138-4782-9e53-555c6c8f6e7f',
              isTrash: false,
              status: 'En attente',
            },
          ],
        },
      },
    },
  };
  const selectedFlow = {
    label: 'Le camion vert',
    value: '58eea2d7-5929-4efc-9dfc-374d2b30ee42',
  };
  it.only('add a new ticket in list', async () => {
    let isRefetchCalled = false;
    const mockAddTicketByFlowId: MockedResponse<AddTicketByFlowIdMutation> = {
      request: {
        query: ADD_TICKET_BY_FLOW_ID,
        variables: {
          flowId: '58eea2d7-5929-4efc-9dfc-374d2b30ee42',
        },
      },
      result: {
        data: {
          addTicketByFlowId: {
            date: '2023-03-29T13:00:36.184Z',
            id: '7d081b08-3b24-4a4a-aa4e-0f983b0f012e',
            isTrash: false,
            status: 'Ticket non scanné',
          },
        },
      },
      newData: () => {
        isRefetchCalled = true;
        return {
          data: {
            addTicketByFlowId: {
              date: '2023-03-29T13:00:36.184Z',
              id: '7d081b08-3b24-4a4a-aa4e-0f983b0f012e',
              isTrash: false,
              status: 'Ticket non scanné',
            },
          },
        };
      },
    };
    const providerProps = { selectedFlow };
    renderTickets(
      [mockAddTicketByFlowId, mockGetTicketByFlowId],
      providerProps
    );
    await waitFor(() => {
      clickOnAddTicketButton();
      expect(isRefetchCalled).toBe(true);
    });
  });
});
describe('When user click on quick change button', () => {
  const mockGetTicketByFlowId: MockedResponse<GetTicketsByFlowIdQuery> = {
    request: {
      query: GET_TICKETS_BY_FLOW_ID,
      variables: {
        flowId: '58eea2d7-5929-4efc-9dfc-374d2b30ee42',
      },
    },
    result: {
      data: {
        getTicketsByFlowId: {
          flowName: 'Le camion vert',
          id: '58eea2d7-5929-4efc-9dfc-374d2b30ee42',
          tickets: [
            {
              date: '2023-03-29T13:00:36.184Z',
              id: '7d081b08-3b24-4a4a-aa4e-0f983b0f012e',
              isTrash: false,
              status: 'Ticket non scanné',
            },
            {
              date: '2023-03-29T14:06:21.209Z',
              id: '992146a1-7138-4782-9e53-555c6c8f6e7f',
              isTrash: false,
              status: 'En attente',
            },
          ],
        },
      },
    },
  };
  const selectedFlow = {
    label: 'Le camion vert',
    value: '58eea2d7-5929-4efc-9dfc-374d2b30ee42',
  };
  it(`change ticket's status`, async () => {
    const providerProps = { selectedFlow };
    await renderTickets([mockGetTicketByFlowId], providerProps);
    clickOnQuiChangeStatus();
  });
});
describe('Ticket', () => {
  const mockGetTicketByFlowId: MockedResponse<GetTicketsByFlowIdQuery> = {
    request: {
      query: GET_TICKETS_BY_FLOW_ID,
      variables: {
        flowId: '58eea2d7-5929-4efc-9dfc-374d2b30ee42',
      },
    },
    result: {
      data: {
        getTicketsByFlowId: {
          flowName: 'Le camion vert',
          id: '58eea2d7-5929-4efc-9dfc-374d2b30ee42',
          tickets: [
            {
              date: '2023-03-29T13:00:36.184Z',
              id: '7d081b08-3b24-4a4a-aa4e-0f983b0f012e',
              isTrash: false,
              status: 'Ticket non scanné',
            },
            {
              date: '2023-03-29T14:06:21.209Z',
              id: '992146a1-7138-4782-9e53-555c6c8f6e7f',
              isTrash: false,
              status: 'En attente',
            },
          ],
        },
      },
    },
  };
  const selectedFlow = {
    label: 'Le camion vert',
    value: '58eea2d7-5929-4efc-9dfc-374d2b30ee42',
  };
  it('renders correctly', async () => {
    renderTickets([mockGetTicketByFlowId], { selectedFlow });

    expect(screen.getByTestId('ticket-container')).toMatchInlineSnapshot(
      TicketSnapshot
    );
  });
});
