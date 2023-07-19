import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { fireEvent, render, waitFor, screen } from '@testing-library/react';
import { AppContext } from 'context/AppContext';
import {
  AddTicketByFlowIdMutation,
  ChangeTicketIsTrashMutation,
  ChangeTicketStatusMutation,
  ChangeTicketsStatusMutation,
  GetTicketsByFlowIdQuery,
  MyprofileQuery,
} from 'gql/graphql';
import Tickets from 'pages/Tickets/Tickets';
import {
  ADD_TICKET_BY_FLOW_ID,
  CHANGE_TICKETS_STATUS_BY_IDS,
  CHANGE_TICKET_STATUS_BY_ID,
  GET_TICKETS_BY_FLOW_ID,
  IS_TRASH_TICKETS_BY_IDS,
} from '../../../gql-store';
import { OperationVariables, ApolloQueryResult } from '@apollo/client';
import { Flow } from 'utils';
jest.mock('react-toastify');

const clickOnAddTicketButton = () => {
  fireEvent.click(screen.getByRole('button', { name: /Ajouter un ticket/i }));
};

const clickOnButton = (buttonName: string) => {
  fireEvent.click(screen.getByTestId('992146a1-7138-4782-9e53-555c6c8f6e7f'));
  expect(screen.getByRole('button', { name: buttonName })).not.toBeDisabled();
  fireEvent.click(screen.getByRole('button', { name: buttonName }));
};

const clickOnQuickChangeButton = (ticketId: string) => {
  fireEvent.click(screen.getByTestId(`button-${ticketId}`));
};

type ValueType = {
  userProfile: MyprofileQuery | null;
  refetch: (
    variables?: Partial<OperationVariables> | undefined
  ) => Promise<ApolloQueryResult<MyprofileQuery | null>>;
  selectedFlow:
    | {
        value: string;
        label: string;
      }
    | undefined;
  setSelectedFlow: React.Dispatch<
    React.SetStateAction<
      | {
          value: string;
          label: string;
        }
      | undefined
    >
  >;
  flowTickets: Flow | undefined;
  setFlowTickets: React.Dispatch<React.SetStateAction<Flow | undefined>>;
};

const renderTickets = async (
  mocks: MockedResponse<
    | AddTicketByFlowIdMutation
    | GetTicketsByFlowIdQuery
    | ChangeTicketsStatusMutation
    | ChangeTicketStatusMutation
    | ChangeTicketIsTrashMutation
    | ChangeTicketIsTrashMutation
  >[] = [],
  providerProps: ValueType
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

const flowTickets: Flow = {
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
};

const userProfile = {
  myProfile: {
    id: '9d194517-b995-496c-a6c2-0568e9e47b7c',
    firstName: 'Harry',
    flows: [
      {
        flowName: 'Le camion vert',
        id: '86b13f3f-389d-4c4b-b50a-fd00a484673c',
        date: '2023-04-28T12:26:45.276Z',
        calculateTicketCounts: {
          incident: 0,
          nonScanned: 0,
          validate: 0,
          waiting: 0,
        },
      },
      {
        flowName: "Pas d'idée de nom",
        id: 'f4be2425-6f79-4e09-b8c1-9c24f611c896',
        date: '2023-04-28T12:26:45.276Z',
        calculateTicketCounts: {
          incident: 0,
          nonScanned: 0,
          validate: 0,
          waiting: 0,
        },
      },
    ],
  },
};

beforeEach(() => {
  isRefetchCalled = false;
});

describe('Tickets :', () => {
  describe('When the app mount Ticket component', () => {
    it('renders correctly', async () => {
      const setFlowTickets = jest.fn();
      const refetch = jest.fn();
      const setSelectedFlow = jest.fn();
      renderTickets([], {
        selectedFlow,
        flowTickets,
        setFlowTickets,
        userProfile,
        refetch,
        setSelectedFlow,
      });
      await waitFor(() => {
        expect(screen.getByTestId('tickets-array')).toBeInTheDocument();
      });
    });
  });

  describe('When user click on tickets buttons', () => {
    describe('When user click on quickChange button', () => {
      describe('When ticket status is Ticket non scanné', () => {
        const mockChangeTicketStatusById: MockedResponse<ChangeTicketStatusMutation> =
          {
            request: {
              query: CHANGE_TICKET_STATUS_BY_ID,
              variables: {
                id: '7d081b08-3b24-4a4a-aa4e-0f983b0f012e',
                status: 'En attente',
              },
            },
            result: {
              data: {
                changeTicketStatus: {
                  date: '2023-04-27T07:14:08.209Z',
                  id: '7d081b08-3b24-4a4a-aa4e-0f983b0f012e',
                  status: 'En attente',
                },
              },
            },
            newData: () => {
              isRefetchCalled = true;
              return {
                data: {
                  changeTicketStatus: {
                    date: '2023-04-27T07:14:08.209Z',
                    id: '7d081b08-3b24-4a4a-aa4e-0f983b0f012e',
                    status: 'En attente',
                  },
                },
              };
            },
          };
        it('change status to En attente', async () => {
          const setFlowTickets = jest.fn();
          const refetch = jest.fn();
          const setSelectedFlow = jest.fn();
          renderTickets([mockChangeTicketStatusById], {
            selectedFlow,
            flowTickets,
            setFlowTickets,
            userProfile,
            refetch,
            setSelectedFlow,
          });
          await waitFor(() => {
            clickOnQuickChangeButton('7d081b08-3b24-4a4a-aa4e-0f983b0f012e');
            expect(isRefetchCalled).toBe(true);
          });
        });
      });
      describe('When ticket status is En attente', () => {
        it('change status to Ticket validé', async () => {
          const setFlowTickets = jest.fn();
          const refetch = jest.fn();
          const mockChangeTicketStatusById: MockedResponse<ChangeTicketStatusMutation> =
            {
              request: {
                query: CHANGE_TICKET_STATUS_BY_ID,
                variables: {
                  id: '7d081b08-3b24-4a4a-aa4e-0f983b0f012e',
                  status: 'En attente',
                },
              },
              result: {
                data: {
                  changeTicketStatus: {
                    date: '2023-04-27T07:14:08.209Z',
                    id: '7d081b08-3b24-4a4a-aa4e-0f983b0f012e',
                    status: 'Ticket validé',
                  },
                },
              },
              newData: () => {
                isRefetchCalled = true;
                return {
                  data: {
                    changeTicketStatus: {
                      date: '2023-04-27T07:14:08.209Z',
                      id: '7d081b08-3b24-4a4a-aa4e-0f983b0f012e',
                      status: 'Ticket validé',
                    },
                  },
                };
              },
            };
          const setSelectedFlow = jest.fn();
          renderTickets([mockChangeTicketStatusById], {
            selectedFlow,
            flowTickets,
            setFlowTickets,
            userProfile,
            refetch,
            setSelectedFlow,
          });
          await waitFor(() => {
            clickOnQuickChangeButton('7d081b08-3b24-4a4a-aa4e-0f983b0f012e');
            expect(isRefetchCalled).toBe(true);
          });
        });
      });
    });
    describe('When user click on Add ticket button', () => {
      it('add a new ticket in list', async () => {
        const setFlowTickets = jest.fn();
        const refetch = jest.fn();
        const mockAddTicketByFlowId: MockedResponse<AddTicketByFlowIdMutation> =
          {
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
        const setSelectedFlow = jest.fn();
        renderTickets([mockAddTicketByFlowId], {
          selectedFlow,
          flowTickets,
          setFlowTickets,
          userProfile,
          refetch,
          setSelectedFlow,
        });
        await waitFor(() => {
          clickOnAddTicketButton();
          expect(isRefetchCalled).toBe(true);
        });
        expect(screen.getByText('7D081')).toBeInTheDocument();
      });
    });
    describe('When user click on delete button', () => {
      it('put ticket in trash', async () => {
        const setFlowTickets = jest.fn();
        const refetch = jest.fn();
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
        const setSelectedFlow = jest.fn();
        renderTickets([mockPutTicketInTrashTicketByFlowId], {
          selectedFlow,
          flowTickets,
          setFlowTickets,
          userProfile,
          refetch,
          setSelectedFlow,
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
        const setSelectedFlow = jest.fn();
        const setFlowTickets = jest.fn();
        const refetch = jest.fn();
        renderTickets([mockChangeWaitingStatusByTicketId], {
          selectedFlow,
          flowTickets,
          setFlowTickets,
          userProfile,
          refetch,
          setSelectedFlow,
        });
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
        const setFlowTickets = jest.fn();
        const refetch = jest.fn();
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
        const setSelectedFlow = jest.fn();
        renderTickets(
          [mockGetTicketByFlowId, mockChangeIncidentStatusByTicketId],
          {
            selectedFlow,
            flowTickets,
            setFlowTickets,
            userProfile,
            refetch,
            setSelectedFlow,
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
        const setFlowTickets = jest.fn();
        const refetch = jest.fn();
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
        const setSelectedFlow = jest.fn();
        renderTickets(
          [mockGetTicketByFlowId, mockChangeValidateStatusByTicketId],
          {
            selectedFlow,
            flowTickets,
            setFlowTickets,
            userProfile,
            refetch,
            setSelectedFlow,
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
