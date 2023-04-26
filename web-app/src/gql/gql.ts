/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel-plugin for production.
 */
const documents = {
    "\n  mutation LogOut {\n    logOut {\n      id\n    }\n    removeCookie\n  }\n": types.LogOutDocument,
    "\n  query Myprofile {\n    myProfile {\n      id\n      firstName\n      flows {\n        flowName\n        id\n      }\n    }\n  }\n": types.MyprofileDocument,
    "\n  mutation addFlow($id: String!, $flowName: String!) {\n    addFlow(id: $id, flowName: $flowName) {\n      id\n      flowName\n    }\n  }\n": types.AddFlowDocument,
    "\n  mutation deleteFlow($arrayId: [String!]!) {\n    deleteFlow(arrayId: $arrayId)\n  }\n": types.DeleteFlowDocument,
    "\n    query getTicketById($id: String!) {\n      getTicketById(id: $id) {\n        isTrash\n        id\n        status\n      }\n    }\n  ": types.GetTicketByIdDocument,
    "\n    mutation ChangeTicketStatus($id: String!, $status: String!) {\n      changeTicketStatus(id: $id, status: $status) {\n        date\n        id\n        status\n      }\n    }\n  ": types.ChangeTicketStatusDocument,
    "\n    subscription Subscription($id: String) {\n      subscriptionWithId(id: $id) {\n        message\n        id\n      }\n    }\n  ": types.SubscriptionDocument,
    "\n  mutation SignIn($emailAddress: String!, $password: String!) {\n    signIn(emailAddress: $emailAddress, password: $password) {\n      id\n      emailAddress\n      firstName\n      lastName\n    }\n  }\n": types.SignInDocument,
    "\n  mutation SignUp(\n    $firstName: String!\n    $lastName: String!\n    $emailAddress: String!\n    $password: String!\n  ) {\n    signUp(\n      firstName: $firstName\n      lastName: $lastName\n      emailAddress: $emailAddress\n      password: $password\n    ) {\n      id\n      emailAddress\n    }\n  }\n": types.SignUpDocument,
    "\n  query GetTicketsByFlowId($flowId: String!) {\n    getTicketsByFlowId(flowId: $flowId) {\n      flowName\n      id\n      tickets {\n        date\n        id\n        isTrash\n        status\n      }\n    }\n  }\n": types.GetTicketsByFlowIdDocument,
    "\n  mutation AddTicketByFlowId($flowId: String!) {\n    addTicketByFlowId(flowId: $flowId) {\n      date\n      id\n      isTrash\n      status\n    }\n  }\n": types.AddTicketByFlowIdDocument,
    "\n  mutation DeleteTickets($arrayId: [String!]!) {\n    deleteTickets(arrayId: $arrayId)\n  }\n": types.DeleteTicketsDocument,
    "\n  mutation ChangeTicketStatus($id: String!, $status: String!) {\n    changeTicketStatus(id: $id, status: $status) {\n      date\n      id\n      status\n    }\n  }\n": types.ChangeTicketStatusDocument,
    "\n  mutation ChangeTicketsStatus($arrayId: [ID!]!, $status: String!) {\n    changeTicketsStatus(arrayId: $arrayId, status: $status) {\n      id\n      date\n      status\n    }\n  }\n": types.ChangeTicketsStatusDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation LogOut {\n    logOut {\n      id\n    }\n    removeCookie\n  }\n"): (typeof documents)["\n  mutation LogOut {\n    logOut {\n      id\n    }\n    removeCookie\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Myprofile {\n    myProfile {\n      id\n      firstName\n      flows {\n        flowName\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  query Myprofile {\n    myProfile {\n      id\n      firstName\n      flows {\n        flowName\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation addFlow($id: String!, $flowName: String!) {\n    addFlow(id: $id, flowName: $flowName) {\n      id\n      flowName\n    }\n  }\n"): (typeof documents)["\n  mutation addFlow($id: String!, $flowName: String!) {\n    addFlow(id: $id, flowName: $flowName) {\n      id\n      flowName\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation deleteFlow($arrayId: [String!]!) {\n    deleteFlow(arrayId: $arrayId)\n  }\n"): (typeof documents)["\n  mutation deleteFlow($arrayId: [String!]!) {\n    deleteFlow(arrayId: $arrayId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query getTicketById($id: String!) {\n      getTicketById(id: $id) {\n        isTrash\n        id\n        status\n      }\n    }\n  "): (typeof documents)["\n    query getTicketById($id: String!) {\n      getTicketById(id: $id) {\n        isTrash\n        id\n        status\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation ChangeTicketStatus($id: String!, $status: String!) {\n      changeTicketStatus(id: $id, status: $status) {\n        date\n        id\n        status\n      }\n    }\n  "): (typeof documents)["\n    mutation ChangeTicketStatus($id: String!, $status: String!) {\n      changeTicketStatus(id: $id, status: $status) {\n        date\n        id\n        status\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    subscription Subscription($id: String) {\n      subscriptionWithId(id: $id) {\n        message\n        id\n      }\n    }\n  "): (typeof documents)["\n    subscription Subscription($id: String) {\n      subscriptionWithId(id: $id) {\n        message\n        id\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation SignIn($emailAddress: String!, $password: String!) {\n    signIn(emailAddress: $emailAddress, password: $password) {\n      id\n      emailAddress\n      firstName\n      lastName\n    }\n  }\n"): (typeof documents)["\n  mutation SignIn($emailAddress: String!, $password: String!) {\n    signIn(emailAddress: $emailAddress, password: $password) {\n      id\n      emailAddress\n      firstName\n      lastName\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation SignUp(\n    $firstName: String!\n    $lastName: String!\n    $emailAddress: String!\n    $password: String!\n  ) {\n    signUp(\n      firstName: $firstName\n      lastName: $lastName\n      emailAddress: $emailAddress\n      password: $password\n    ) {\n      id\n      emailAddress\n    }\n  }\n"): (typeof documents)["\n  mutation SignUp(\n    $firstName: String!\n    $lastName: String!\n    $emailAddress: String!\n    $password: String!\n  ) {\n    signUp(\n      firstName: $firstName\n      lastName: $lastName\n      emailAddress: $emailAddress\n      password: $password\n    ) {\n      id\n      emailAddress\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetTicketsByFlowId($flowId: String!) {\n    getTicketsByFlowId(flowId: $flowId) {\n      flowName\n      id\n      tickets {\n        date\n        id\n        isTrash\n        status\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetTicketsByFlowId($flowId: String!) {\n    getTicketsByFlowId(flowId: $flowId) {\n      flowName\n      id\n      tickets {\n        date\n        id\n        isTrash\n        status\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation AddTicketByFlowId($flowId: String!) {\n    addTicketByFlowId(flowId: $flowId) {\n      date\n      id\n      isTrash\n      status\n    }\n  }\n"): (typeof documents)["\n  mutation AddTicketByFlowId($flowId: String!) {\n    addTicketByFlowId(flowId: $flowId) {\n      date\n      id\n      isTrash\n      status\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteTickets($arrayId: [String!]!) {\n    deleteTickets(arrayId: $arrayId)\n  }\n"): (typeof documents)["\n  mutation DeleteTickets($arrayId: [String!]!) {\n    deleteTickets(arrayId: $arrayId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation ChangeTicketStatus($id: String!, $status: String!) {\n    changeTicketStatus(id: $id, status: $status) {\n      date\n      id\n      status\n    }\n  }\n"): (typeof documents)["\n  mutation ChangeTicketStatus($id: String!, $status: String!) {\n    changeTicketStatus(id: $id, status: $status) {\n      date\n      id\n      status\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation ChangeTicketsStatus($arrayId: [ID!]!, $status: String!) {\n    changeTicketsStatus(arrayId: $arrayId, status: $status) {\n      id\n      date\n      status\n    }\n  }\n"): (typeof documents)["\n  mutation ChangeTicketsStatus($arrayId: [ID!]!, $status: String!) {\n    changeTicketsStatus(arrayId: $arrayId, status: $status) {\n      id\n      date\n      status\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;