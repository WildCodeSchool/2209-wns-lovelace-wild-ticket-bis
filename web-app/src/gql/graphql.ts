/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type AppUser = {
  __typename?: 'AppUser';
  emailAddress: Scalars['String'];
  firstName: Scalars['String'];
  flows: Array<Flow>;
  id: Scalars['ID'];
  lastName: Scalars['String'];
};

export type Flow = {
  __typename?: 'Flow';
  appUser: AppUser;
  calculateTicketCounts: NumberOfTickets;
  date: Scalars['DateTime'];
  flowName: Scalars['String'];
  id: Scalars['ID'];
  tickets: Array<Ticket>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addFlow: Flow;
  addTicketByFlowId: Ticket;
  changeTicketIsTrash: Array<Ticket>;
  changeTicketStatus: Ticket;
  changeTicketsStatus: Array<Ticket>;
  deleteFlow: Scalars['Int'];
  deleteTickets: Scalars['Int'];
  logOut: Session;
  removeCookie: Scalars['String'];
  signIn: AppUser;
  signUp: AppUser;
};

export type MutationAddFlowArgs = {
  flowName: Scalars['String'];
  id: Scalars['String'];
};

export type MutationAddTicketByFlowIdArgs = {
  flowId: Scalars['String'];
};

export type MutationChangeTicketIsTrashArgs = {
  arrayId: Array<Scalars['ID']>;
  isTrash: Scalars['Boolean'];
};

export type MutationChangeTicketStatusArgs = {
  id: Scalars['String'];
  status: Scalars['String'];
};

export type MutationChangeTicketsStatusArgs = {
  arrayId: Array<Scalars['ID']>;
  status: Scalars['String'];
};

export type MutationDeleteFlowArgs = {
  arrayId: Array<Scalars['String']>;
};

export type MutationDeleteTicketsArgs = {
  arrayId: Array<Scalars['String']>;
};

export type MutationSignInArgs = {
  emailAddress: Scalars['String'];
  password: Scalars['String'];
};

export type MutationSignUpArgs = {
  emailAddress: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
};

export type Notification = {
  __typename?: 'Notification';
  id: Scalars['String'];
  message: Scalars['String'];
};

export type NotificationNewTicket = {
  __typename?: 'NotificationNewTicket';
  flowId: Scalars['String'];
  id: Scalars['String'];
  message: Scalars['String'];
};

export type NumberOfTickets = {
  __typename?: 'NumberOfTickets';
  incident?: Maybe<Scalars['Float']>;
  nonScanned?: Maybe<Scalars['Float']>;
  validate?: Maybe<Scalars['Float']>;
  waiting?: Maybe<Scalars['Float']>;
};

export type Query = {
  __typename?: 'Query';
  getTicketById: Ticket;
  getTicketsByFlowId: Flow;
  myProfile: AppUser;
};

export type QueryGetTicketByIdArgs = {
  id: Scalars['String'];
};

export type QueryGetTicketsByFlowIdArgs = {
  flowId: Scalars['String'];
};

export type Session = {
  __typename?: 'Session';
  id: Scalars['ID'];
};

export type Subscription = {
  __typename?: 'Subscription';
  SubscriptionForTicketAddToFlow: NotificationNewTicket;
  normalSubscription: Notification;
  subscriptionWithId: Notification;
};

export type SubscriptionSubscriptionForTicketAddToFlowArgs = {
  id: Scalars['String'];
};

export type SubscriptionSubscriptionWithIdArgs = {
  id?: InputMaybe<Scalars['String']>;
  ids?: InputMaybe<Array<Scalars['String']>>;
};

export type Ticket = {
  __typename?: 'Ticket';
  date: Scalars['DateTime'];
  flow: Flow;
  id: Scalars['ID'];
  isTrash: Scalars['Boolean'];
  status: Scalars['String'];
};

export type SignUpMutationVariables = Exact<{
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  emailAddress: Scalars['String'];
  password: Scalars['String'];
}>;

export type SignUpMutation = {
  __typename?: 'Mutation';
  signUp: { __typename?: 'AppUser'; id: string; emailAddress: string };
};

export type SignInMutationVariables = Exact<{
  emailAddress: Scalars['String'];
  password: Scalars['String'];
}>;

export type SignInMutation = {
  __typename?: 'Mutation';
  signIn: {
    __typename?: 'AppUser';
    id: string;
    emailAddress: string;
    firstName: string;
    lastName: string;
  };
};

export type LogOutMutationVariables = Exact<{ [key: string]: never }>;

export type LogOutMutation = {
  __typename?: 'Mutation';
  removeCookie: string;
  logOut: { __typename?: 'Session'; id: string };
};

export type MyprofileQueryVariables = Exact<{ [key: string]: never }>;

export type MyprofileQuery = {
  __typename?: 'Query';
  myProfile: {
    __typename?: 'AppUser';
    id: string;
    firstName: string;
    flows: Array<{
      __typename?: 'Flow';
      flowName: string;
      id: string;
      date: any;
      calculateTicketCounts: {
        __typename?: 'NumberOfTickets';
        incident?: number | null;
        nonScanned?: number | null;
        validate?: number | null;
        waiting?: number | null;
      };
    }>;
  };
};

export type AddFlowMutationVariables = Exact<{
  id: Scalars['String'];
  flowName: Scalars['String'];
}>;

export type AddFlowMutation = {
  __typename?: 'Mutation';
  addFlow: { __typename?: 'Flow'; id: string; flowName: string };
};

export type DeleteFlowMutationVariables = Exact<{
  arrayId: Array<Scalars['String']> | Scalars['String'];
}>;

export type DeleteFlowMutation = {
  __typename?: 'Mutation';
  deleteFlow: number;
};

export type GetTicketsByFlowIdQueryVariables = Exact<{
  flowId: Scalars['String'];
}>;

export type GetTicketsByFlowIdQuery = {
  __typename?: 'Query';
  getTicketsByFlowId: {
    __typename?: 'Flow';
    flowName: string;
    id: string;
    tickets: Array<{
      __typename?: 'Ticket';
      date: any;
      id: string;
      isTrash: boolean;
      status: string;
    }>;
  };
};

export type GetTicketByIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;

export type GetTicketByIdQuery = {
  __typename?: 'Query';
  getTicketById: {
    __typename?: 'Ticket';
    isTrash: boolean;
    id: string;
    status: string;
  };
};

export type DeleteTicketsMutationVariables = Exact<{
  arrayId: Array<Scalars['String']> | Scalars['String'];
}>;

export type DeleteTicketsMutation = {
  __typename?: 'Mutation';
  deleteTickets: number;
};

export type AddTicketByFlowIdMutationVariables = Exact<{
  flowId: Scalars['String'];
}>;

export type AddTicketByFlowIdMutation = {
  __typename?: 'Mutation';
  addTicketByFlowId: {
    __typename?: 'Ticket';
    date: any;
    id: string;
    isTrash: boolean;
    status: string;
  };
};

export type ChangeTicketStatusMutationVariables = Exact<{
  id: Scalars['String'];
  status: Scalars['String'];
}>;

export type ChangeTicketStatusMutation = {
  __typename?: 'Mutation';
  changeTicketStatus: {
    __typename?: 'Ticket';
    date: any;
    id: string;
    status: string;
  };
};

export type ChangeTicketsStatusMutationVariables = Exact<{
  arrayId: Array<Scalars['ID']> | Scalars['ID'];
  status: Scalars['String'];
}>;

export type ChangeTicketsStatusMutation = {
  __typename?: 'Mutation';
  changeTicketsStatus: Array<{
    __typename?: 'Ticket';
    id: string;
    date: any;
    status: string;
  }>;
};

export type ChangeTicketIsTrashMutationVariables = Exact<{
  arrayId: Array<Scalars['ID']> | Scalars['ID'];
  isTrash: Scalars['Boolean'];
}>;

export type ChangeTicketIsTrashMutation = {
  __typename?: 'Mutation';
  changeTicketIsTrash: Array<{
    __typename?: 'Ticket';
    date: any;
    id: string;
    isTrash: boolean;
    status: string;
  }>;
};

export type SubscriptionWithIdsSubscriptionVariables = Exact<{
  ids?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
}>;

export type SubscriptionWithIdsSubscription = {
  __typename?: 'Subscription';
  subscriptionWithId: {
    __typename?: 'Notification';
    id: string;
    message: string;
  };
};

export type SubscriptionWithIdSubscriptionVariables = Exact<{
  id: Scalars['String'];
}>;

export type SubscriptionWithIdSubscription = {
  __typename?: 'Subscription';
  subscriptionWithId: {
    __typename?: 'Notification';
    id: string;
    message: string;
  };
};

export type SubscriptionForTicketAddToFlowSubscriptionVariables = Exact<{
  id: Scalars['String'];
}>;

export type SubscriptionForTicketAddToFlowSubscription = {
  __typename?: 'Subscription';
  SubscriptionForTicketAddToFlow: {
    __typename?: 'NotificationNewTicket';
    message: string;
    id: string;
    flowId: string;
  };
};

export const SignUpDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'SignUp' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'firstName' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'lastName' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'emailAddress' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'password' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'signUp' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'firstName' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'firstName' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'lastName' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'lastName' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'emailAddress' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'emailAddress' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'password' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'password' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'emailAddress' },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<SignUpMutation, SignUpMutationVariables>;
export const SignInDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'SignIn' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'emailAddress' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'password' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'signIn' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'emailAddress' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'emailAddress' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'password' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'password' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'emailAddress' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'lastName' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<SignInMutation, SignInMutationVariables>;
export const LogOutDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'LogOut' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'logOut' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'removeCookie' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<LogOutMutation, LogOutMutationVariables>;
export const MyprofileDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'Myprofile' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'myProfile' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'flows' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'flowName' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'date' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'calculateTicketCounts' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'incident' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'nonScanned' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'validate' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'waiting' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<MyprofileQuery, MyprofileQueryVariables>;
export const AddFlowDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'addFlow' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'flowName' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'addFlow' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'id' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'flowName' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'flowName' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'flowName' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AddFlowMutation, AddFlowMutationVariables>;
export const DeleteFlowDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'deleteFlow' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'arrayId' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'ListType',
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: { kind: 'Name', value: 'String' },
                },
              },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'deleteFlow' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'arrayId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'arrayId' },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<DeleteFlowMutation, DeleteFlowMutationVariables>;
export const GetTicketsByFlowIdDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetTicketsByFlowId' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'flowId' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'getTicketsByFlowId' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'flowId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'flowId' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'flowName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'tickets' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'date' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'isTrash' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'status' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetTicketsByFlowIdQuery,
  GetTicketsByFlowIdQueryVariables
>;
export const GetTicketByIdDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'getTicketById' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'getTicketById' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'id' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'isTrash' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetTicketByIdQuery, GetTicketByIdQueryVariables>;
export const DeleteTicketsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'DeleteTickets' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'arrayId' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'ListType',
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: { kind: 'Name', value: 'String' },
                },
              },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'deleteTickets' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'arrayId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'arrayId' },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  DeleteTicketsMutation,
  DeleteTicketsMutationVariables
>;
export const AddTicketByFlowIdDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'AddTicketByFlowId' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'flowId' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'addTicketByFlowId' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'flowId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'flowId' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'date' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'isTrash' } },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  AddTicketByFlowIdMutation,
  AddTicketByFlowIdMutationVariables
>;
export const ChangeTicketStatusDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'ChangeTicketStatus' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'status' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'changeTicketStatus' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'id' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'status' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'status' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'date' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  ChangeTicketStatusMutation,
  ChangeTicketStatusMutationVariables
>;
export const ChangeTicketsStatusDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'ChangeTicketsStatus' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'arrayId' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'ListType',
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: { kind: 'Name', value: 'ID' },
                },
              },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'status' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'changeTicketsStatus' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'arrayId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'arrayId' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'status' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'status' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'date' } },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  ChangeTicketsStatusMutation,
  ChangeTicketsStatusMutationVariables
>;
export const ChangeTicketIsTrashDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'ChangeTicketIsTrash' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'arrayId' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'ListType',
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: { kind: 'Name', value: 'ID' },
                },
              },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'isTrash' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'Boolean' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'changeTicketIsTrash' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'arrayId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'arrayId' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'isTrash' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'isTrash' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'date' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'isTrash' } },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  ChangeTicketIsTrashMutation,
  ChangeTicketIsTrashMutationVariables
>;
export const SubscriptionWithIdsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'subscription',
      name: { kind: 'Name', value: 'SubscriptionWithIds' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'ids' } },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: { kind: 'Name', value: 'String' },
              },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'subscriptionWithId' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'ids' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'ids' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'message' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  SubscriptionWithIdsSubscription,
  SubscriptionWithIdsSubscriptionVariables
>;
export const SubscriptionWithIdDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'subscription',
      name: { kind: 'Name', value: 'SubscriptionWithId' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'subscriptionWithId' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'id' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'message' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  SubscriptionWithIdSubscription,
  SubscriptionWithIdSubscriptionVariables
>;
export const SubscriptionForTicketAddToFlowDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'subscription',
      name: { kind: 'Name', value: 'SubscriptionForTicketAddToFlow' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'SubscriptionForTicketAddToFlow' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'id' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'message' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'flowId' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  SubscriptionForTicketAddToFlowSubscription,
  SubscriptionForTicketAddToFlowSubscriptionVariables
>;
