import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { fireEvent, render, waitFor, screen } from '@testing-library/react';
import { AppContext } from 'context/AppContext';
import {
  AddTicketByFlowIdMutation,
  ChangeTicketIsTrashMutation,
  ChangeTicketsStatusMutation,
  GetTicketsByFlowIdQuery,
} from 'gql/graphql';
import { IS_TRASH_TICKETS_BY_IDS } from 'pages/Corbeille/Corbeille';
import Tickets, {
  ADD_TICKET_BY_FLOW_ID,
  CHANGE_TICKETS_STATUS_BY_IDS,
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
    | ChangeTicketsStatusMutation
    | ChangeTicketIsTrashMutation
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

let isRefetchCalled = false;

const selectedFlow = {
  label: 'Le camion vert',
  value: '58eea2d7-5929-4efc-9dfc-374d2b30ee42',
};

beforeEach(() => {
  isRefetchCalled = false;
});

describe('Tickets :', () => {
  describe('When the app mount Ticket component', () => {
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
    it('renders correctly', async () => {
      renderTickets([mockGetTicketByFlowId], { selectedFlow });
      await waitFor(() => {
        expect(screen.getByTestId('tickets-array')).toBeInTheDocument();
      });
    });
  });

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
                date: '2023-03-29T14:06:21.209Z',
                id: '992146a1-7138-4782-9e53-555c6c8f6e7f',
                isTrash: false,
                status: 'En attente',
              },
              {
                date: '2023-03-29T13:00:36.184Z',
                id: '7d081b08-3b24-4a4a-aa4e-0f983b0f012e',
                isTrash: false,
                status: 'Ticket non scanné',
              },
            ],
          },
        },
      },
    };
    it('add a new ticket in list', async () => {
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
      it('put ticket in trash', async () => {
        const mockPutTicketInTrashTicketByFlowId: MockedResponse<ChangeTicketIsTrashMutation> =
          {
            request: {
              query: IS_TRASH_TICKETS_BY_IDS,
              variables: {
                arrayId: ['992146a1-7138-4782-9e53-555c6c8f6e7f'],
                isTrash: true,
              },
            },
            result: {
              data: {
                changeTicketIsTrash: [
                  {
                    date: '2023-04-27T07:14:08.209Z',
                    id: '4e57ed5d-98ef-4dd5-a392-4473a2464159',
                    isTrash: true,
                    status: 'Ticket non scanné',
                  },
                ],
              },
            },
            newData: () => {
              isRefetchCalled = true;
              return {
                data: {
                  changeTicketIsTrash: [
                    {
                      date: '2023-04-27T07:14:08.209Z',
                      id: '4e57ed5d-98ef-4dd5-a392-4473a2464159',
                      isTrash: true,
                      status: 'Ticket non scanné',
                    },
                  ],
                  getTicketsByFlowId: {
                    flowName: 'Le camion vert',
                    id: '58eea2d7-5929-4efc-9dfc-374d2b30ee42',
                    tickets: [
                      {
                        date: '2023-03-29T13:00:36.184Z',
                        id: '7d081b08-3b24-4a4a-aa4e-0f983b0f012e',
                        isTrash: true,
                        status: 'Ticket non scanné',
                      },
                    ],
                  },
                },
              };
            },
          };

        renderTickets(
          [mockGetTicketByFlowId, mockPutTicketInTrashTicketByFlowId],
          {
            selectedFlow,
          }
        );
        await waitFor(async () => {
          expect(screen.getByText('99214')).toBeInTheDocument();
        });
        clickOnButton('Supprimer');
        expect(isRefetchCalled).toBeTruthy();
      });
    });
    describe('When user click on waiting button', () => {
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
                  date: '2023-03-29T14:06:21.209Z',
                  id: '992146a1-7138-4782-9e53-555c6c8f6e7f',
                  isTrash: false,
                  status: 'Ticket non scanné',
                },
              ],
            },
          },
        },
      };
      it('Change ticket status to wait', async () => {
        const mockChangeWaitingStatusByTicketId: MockedResponse<ChangeTicketsStatusMutation> =
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
                changeTicketsStatus: [
                  {
                    id: '992146a1-7138-4782-9e53-555c6c8f6e7f',
                    status: 'En attente',
                    date: '2023-03-29T14:06:21.209Z',
                  },
                ],
              },
            },
            newData: () => {
              isRefetchCalled = true;
              return {
                data: {
                  changeTicketsStatus: [
                    {
                      id: '992146a1-7138-4782-9e53-555c6c8f6e7f',
                      status: 'En attente',
                      date: '2023-03-29T14:06:21.209Z',
                    },
                  ],
                  getTicketsByFlowId: {
                    flowName: 'Le camion vert',
                    id: '58eea2d7-5929-4efc-9dfc-374d2b30ee42',
                    tickets: [
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
    describe('When user click on Error button', () => {
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
                  date: '2023-03-29T14:06:21.209Z',
                  id: '992146a1-7138-4782-9e53-555c6c8f6e7f',
                  isTrash: false,
                  status: 'Ticket non scanné',
                },
              ],
            },
          },
        },
      };
      it('change status to Error', async () => {
        const mockChangeIncidentStatusByTicketId: MockedResponse<ChangeTicketsStatusMutation> =
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
                changeTicketsStatus: [
                  {
                    id: '992146a1-7138-4782-9e53-555c6c8f6e7f',
                    status: 'Incident',
                    date: '2023-03-29T14:06:21.209Z',
                  },
                ],
              },
            },
            newData: () => {
              isRefetchCalled = true;
              return {
                data: {
                  changeTicketsStatus: [
                    {
                      id: '992146a1-7138-4782-9e53-555c6c8f6e7f',
                      status: 'Incident',
                      date: '2023-03-29T14:06:21.209Z',
                    },
                  ],
                  getTicketsByFlowId: {
                    flowName: 'Le camion vert',
                    id: '58eea2d7-5929-4efc-9dfc-374d2b30ee42',
                    tickets: [
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
    describe('When user click on validate button', () => {
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
                  date: '2023-03-29T14:06:21.209Z',
                  id: '992146a1-7138-4782-9e53-555c6c8f6e7f',
                  isTrash: false,
                  status: 'Ticket non scanné',
                },
              ],
            },
          },
        },
      };
      it('change ticket status to validate', async () => {
        const mockChangeValidateStatusByTicketId: MockedResponse<ChangeTicketsStatusMutation> =
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
                changeTicketsStatus: [
                  {
                    id: '992146a1-7138-4782-9e53-555c6c8f6e7f',
                    status: 'Ticket validé',
                    date: '2023-03-29T14:06:21.209Z',
                  },
                ],
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
});
