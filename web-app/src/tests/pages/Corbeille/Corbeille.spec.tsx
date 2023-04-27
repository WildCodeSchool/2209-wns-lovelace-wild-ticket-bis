import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { fireEvent, waitFor, screen, render } from '@testing-library/react';
import { AppContext } from 'context/AppContext';
import {
  GetTicketsByFlowIdQuery,
  DeleteTicketsMutation,
  ChangeTicketIsTrashMutation,
} from 'gql/graphql';
import Corbeille, {
  GET_TICKETS_BY_FLOW_ID,
  DELETE_TICKETS_BY_ID,
  IS_TRASH_TICKETS_BY_IDS,
} from 'pages/Corbeille/Corbeille';

jest.mock('react-toastify');

let isRefetchCalled = false;

const clickOnButton = (buttonName: string) => {
  fireEvent.click(screen.getByTestId('992146a1-7138-4782-9e53-555c6c8f6e7f'));
  expect(screen.getByRole('button', { name: buttonName })).not.toBeDisabled();
  fireEvent.click(screen.getByRole('button', { name: buttonName }));
};

const renderTickets = async (
  mocks: MockedResponse<
    | GetTicketsByFlowIdQuery
    | DeleteTicketsMutation
    | ChangeTicketIsTrashMutation
  >[] = [],
  providerProps: any
) => {
  return render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <AppContext.Provider value={{ ...providerProps }}>
        <Corbeille />
      </AppContext.Provider>
    </MockedProvider>
  );
};

beforeEach(() => {
  isRefetchCalled = false;
});

const selectedFlow = {
  label: 'Le camion vert',
  value: '58eea2d7-5929-4efc-9dfc-374d2b30ee42',
};

describe('Corbeille :', () => {
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
                isTrash: true,
                status: 'Ticket non scanné',
              },
              {
                date: '2023-03-29T14:06:21.209Z',
                id: '992146a1-7138-4782-9e53-555c6c8f6e7f',
                isTrash: true,
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
                isTrash: true,
                status: 'Ticket non scanné',
              },
              {
                date: '2023-03-29T14:06:21.209Z',
                id: '992146a1-7138-4782-9e53-555c6c8f6e7f',
                isTrash: true,
                status: 'En attente',
              },
            ],
          },
        },
      },
    };
    it(`delete ticket`, async () => {
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
              deleteTickets: 1,
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
      clickOnButton('Supprimer définitivement');
      expect(isRefetchCalled).toBeTruthy();
    });
  });
  describe('When user click transfer ticket button', () => {
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
                isTrash: true,
                status: 'Ticket non scanné',
              },
              {
                date: '2023-03-29T14:06:21.209Z',
                id: '992146a1-7138-4782-9e53-555c6c8f6e7f',
                isTrash: true,
                status: 'En attente',
              },
            ],
          },
        },
      },
    };
    it('put back ticket its flux', async () => {
      const mockPutTicketInTrashTicketByFlowId: MockedResponse<ChangeTicketIsTrashMutation> =
        {
          request: {
            query: IS_TRASH_TICKETS_BY_IDS,
            variables: {
              arrayId: ['992146a1-7138-4782-9e53-555c6c8f6e7f'],
              isTrash: false,
            },
          },
          result: {
            data: {
              changeTicketIsTrash: [
                {
                  date: '2023-04-27T07:14:08.209Z',
                  id: '4e57ed5d-98ef-4dd5-a392-4473a2464159',
                  isTrash: false,
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
                    isTrash: false,
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
                      isTrash: false,
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
      clickOnButton('Transférer dans le flu');
      expect(isRefetchCalled).toBeTruthy();
    });
  });
});
