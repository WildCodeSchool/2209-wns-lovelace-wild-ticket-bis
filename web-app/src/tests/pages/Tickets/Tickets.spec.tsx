import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { fireEvent, render, waitFor, screen } from '@testing-library/react';
import { AppContext } from 'context/AppContext';
import {
  AddTicketByFlowIdMutation,
  ChangeTicketStatusMutation,
  DeleteTicketsMutation,
  GetTicketsByFlowIdQuery,
} from 'gql/graphql';
import Tickets, {
  ADD_TICKET_BY_FLOW_ID,
  CHANGE_TICKETS_STATUS_BY_IDS,
  DELETE_TICKETS_BY_ID,
  GET_TICKETS_BY_FLOW_ID,
} from 'pages/Tickets/Tickets';

jest.mock('react-toastify');

const clickOnAddTicketButton = () => {
  fireEvent.click(screen.getByRole('button', { name: /Ajouter un ticket/i }));
};

const clickOnButton = (buttonName: string) => {
  fireEvent.click(screen.getByTestId('992146a1-7138-4782-9e53-555c6c8f6e7f'));
  expect(screen.getByRole('button', { name: buttonName })).not.toBeDisabled();
  fireEvent.click(screen.getByRole('button', { name: buttonName }));
};

const renderTickets = async (
  mocks: MockedResponse<
    | AddTicketByFlowIdMutation
    | GetTicketsByFlowIdQuery
    | DeleteTicketsMutation
    | ChangeTicketStatusMutation
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

beforeEach(() => {
  const initializeGetTicketMock = () => {
    return mockGetTicketByFlowId;
  };
  const initializeContext = () => {
    return selectedFlow;
  };
  initializeGetTicketMock();
  initializeContext();
});

describe('When the app mount Ticket component', () => {
  it('renders correctly', async () => {
    renderTickets([mockGetTicketByFlowId], { selectedFlow });
    await waitFor(() => {
      expect(screen.getByTestId('tickets-array')).toBeInTheDocument();
    });
  });
});

describe('When user click on Add ticket button', () => {
  it('add a new ticket in list', async () => {
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
    renderTickets([mockAddTicketByFlowId, mockGetTicketByFlowId], {
      selectedFlow,
    });
    await waitFor(() => {
      clickOnAddTicketButton();
      expect(isRefetchCalled).toBe(true);
    });
    expect(screen.getByText('7D081')).toBeInTheDocument();
  });
});

describe('When user click on tickets buttons', () => {
  describe('When user click on delete button', () => {
    it(`delete ticket`, async () => {
      let isRefetchCalled = false;
      const mockDeleteTicketByFlowId: MockedResponse<DeleteTicketsMutation> = {
        request: {
          query: DELETE_TICKETS_BY_ID,
          variables: {
            arrayId: ['992146a1-7138-4782-9e53-555c6c8f6e7f'],
          },
        },
        result: {
          data: {
            deleteTickets: 1,
          },
        },
        newData: () => {
          isRefetchCalled = true;
          return {
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
                ],
              },
            },
          };
        },
      };

      renderTickets([mockGetTicketByFlowId, mockDeleteTicketByFlowId], {
        selectedFlow,
      });
      await waitFor(async () => {
        expect(screen.getByText('99214')).toBeInTheDocument();
      });
      clickOnButton('Supprimer');
      expect(isRefetchCalled).toBeTruthy();
    });
  });
  describe('When user click on waiting button', () => {
    it('Change ticket status to wait', async () => {
      let isRefetchCalled = false;
      const mockChangeWaitingStatusByTicketId: MockedResponse<ChangeTicketStatusMutation> =
        {
          request: {
            query: CHANGE_TICKETS_STATUS_BY_IDS,
            variables: {
              arrayId: ['992146a1-7138-4782-9e53-555c6c8f6e7f'],
              status: 'En attente',
            },
          },
          result: {
            data: {
              changeTicketStatus: {
                date: '2023-03-29T14:06:21.209Z',
                id: '992146a1-7138-4782-9e53-555c6c8f6e7f',
                status: 'En attente',
              },
            },
          },
          newData: () => {
            isRefetchCalled = true;
            return {
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
            };
          },
        };
      renderTickets(
        [mockGetTicketByFlowId, mockChangeWaitingStatusByTicketId],
        {
          selectedFlow,
        }
      );
      await waitFor(async () => {
        expect(screen.getByText('99214')).toBeInTheDocument();
      });
      clickOnButton('En attente');
      expect(isRefetchCalled).toBeTruthy();
    });
  });
  describe('When user click on validate button', () => {
    it('change status to validate', async () => {
      let isRefetchCalled = false;
      const mockChangeIncidentStatusByTicketId: MockedResponse<ChangeTicketStatusMutation> =
        {
          request: {
            query: CHANGE_TICKETS_STATUS_BY_IDS,
            variables: {
              arrayId: ['992146a1-7138-4782-9e53-555c6c8f6e7f'],
              status: 'Incident',
            },
          },
          result: {
            data: {
              changeTicketStatus: {
                date: '2023-03-29T14:06:21.209Z',
                id: '992146a1-7138-4782-9e53-555c6c8f6e7f',
                status: 'Incident',
              },
            },
          },
          newData: () => {
            isRefetchCalled = true;
            return {
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
                      status: 'Incident',
                    },
                  ],
                },
              },
            };
          },
        };
      renderTickets(
        [mockGetTicketByFlowId, mockChangeIncidentStatusByTicketId],
        {
          selectedFlow,
        }
      );
      await waitFor(async () => {
        expect(screen.getByText('99214')).toBeInTheDocument();
      });
      clickOnButton('Incident');
      expect(isRefetchCalled).toBeTruthy();
    });
  });
  describe('When user click on error button', () => {
    it('change ticket status to error', async () => {
      let isRefetchCalled = false;
      const mockChangeValidateStatusByTicketId: MockedResponse<ChangeTicketStatusMutation> =
        {
          request: {
            query: CHANGE_TICKETS_STATUS_BY_IDS,
            variables: {
              arrayId: ['992146a1-7138-4782-9e53-555c6c8f6e7f'],
              status: 'Ticket validé',
            },
          },
          result: {
            data: {
              changeTicketStatus: {
                date: '2023-03-29T14:06:21.209Z',
                id: '992146a1-7138-4782-9e53-555c6c8f6e7f',
                status: 'Ticket validé',
              },
            },
          },
          newData: () => {
            isRefetchCalled = true;
            return {
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
                      status: 'Ticket validé',
                    },
                  ],
                },
              },
            };
          },
        };
      renderTickets(
        [mockGetTicketByFlowId, mockChangeValidateStatusByTicketId],
        {
          selectedFlow,
        }
      );
      await waitFor(async () => {
        expect(screen.getByText('99214')).toBeInTheDocument();
      });
      clickOnButton('Valider');
      expect(isRefetchCalled).toBeTruthy();
    });
  });
});
