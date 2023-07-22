import { OperationVariables, ApolloQueryResult } from '@apollo/client';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { fireEvent, waitFor, screen, render } from '@testing-library/react';
import { AppContext } from 'context/AppContext';
import { DELETE_TICKETS_BY_ID, IS_TRASH_TICKETS_BY_IDS } from 'gql-store';
import {
  GetTicketsByFlowIdQuery,
  DeleteTicketsMutation,
  ChangeTicketIsTrashMutation,
  MyprofileQuery,
} from 'gql/graphql';
import Corbeille from 'pages/Corbeille/Corbeille';
import { Flow } from 'utils';

jest.mock('react-toastify');

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
  providerProps: ValueType
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

const flowTickets: Flow = {
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

describe('Corbeille :', () => {
  describe('When the app mount Ticket component', () => {
    const setFlowTickets = jest.fn();
    const refetch = jest.fn();
    const setSelectedFlow = jest.fn();
    it('renders correctly', async () => {
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

  describe('When user click on delete button', () => {
    const setFlowTickets = jest.fn();
    const refetch = jest.fn();
    const setSelectedFlow = jest.fn();
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

      renderTickets([mockDeleteTicketByFlowId], {
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
      clickOnButton('Supprimer définitivement');
      expect(isRefetchCalled).toBeTruthy();
    });
  });
  describe('When user click transfer ticket button', () => {
    const setFlowTickets = jest.fn();
    const refetch = jest.fn();
    const setSelectedFlow = jest.fn();
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
      clickOnButton('Transférer dans le flu');
      expect(isRefetchCalled).toBeTruthy();
    });
  });
});
