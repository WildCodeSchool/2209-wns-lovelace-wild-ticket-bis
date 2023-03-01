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
    "\n  query Myprofile {\n    myProfile {\n      id\n      firstName\n      flows {\n        flowName\n        id\n        tickets {\n          orderNumber\n        }\n      }\n    }\n  }\n": types.MyprofileDocument,
    "\n  mutation LogOut {\n    logOut {\n      id\n    }\n    removeCookie\n  }\n": types.LogOutDocument,
    "\n  query MyProfileQuery {\n    myProfile {\n      id\n      emailAddress\n      firstName\n      lastName\n    }\n  }\n": types.MyProfileQueryDocument,
    "\n  mutation addFlow($id: String!, $flowName: String!) {\n    addFlow(id: $id, flowName: $flowName) {\n      id\n      flowName\n    }\n  }\n": types.AddFlowDocument,
    "\n  mutation deleteFlow($arrayId: [String!]!) {\n    deleteFlow(arrayId: $arrayId)\n  }\n": types.DeleteFlowDocument,
    "\n  mutation SignIn($emailAddress: String!, $password: String!) {\n    signIn(emailAddress: $emailAddress, password: $password) {\n      id\n      emailAddress\n      firstName\n      lastName\n    }\n  }\n": types.SignInDocument,
    "\n  mutation SignUp(\n    $firstName: String!\n    $lastName: String!\n    $emailAddress: String!\n    $password: String!\n  ) {\n    signUp(\n      firstName: $firstName\n      lastName: $lastName\n      emailAddress: $emailAddress\n      password: $password\n    ) {\n      id\n      emailAddress\n    }\n  }\n": types.SignUpDocument,
    "\n  query Flows {\n    myProfile {\n      flows {\n        id\n        flowName\n        tickets {\n          id\n          date\n          orderNumber\n          status\n          isTrash\n        }\n      }\n    }\n  }\n": types.FlowsDocument,
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
export function graphql(source: "\n  query Myprofile {\n    myProfile {\n      id\n      firstName\n      flows {\n        flowName\n        id\n        tickets {\n          orderNumber\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query Myprofile {\n    myProfile {\n      id\n      firstName\n      flows {\n        flowName\n        id\n        tickets {\n          orderNumber\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation LogOut {\n    logOut {\n      id\n    }\n    removeCookie\n  }\n"): (typeof documents)["\n  mutation LogOut {\n    logOut {\n      id\n    }\n    removeCookie\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query MyProfileQuery {\n    myProfile {\n      id\n      emailAddress\n      firstName\n      lastName\n    }\n  }\n"): (typeof documents)["\n  query MyProfileQuery {\n    myProfile {\n      id\n      emailAddress\n      firstName\n      lastName\n    }\n  }\n"];
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
export function graphql(source: "\n  mutation SignIn($emailAddress: String!, $password: String!) {\n    signIn(emailAddress: $emailAddress, password: $password) {\n      id\n      emailAddress\n      firstName\n      lastName\n    }\n  }\n"): (typeof documents)["\n  mutation SignIn($emailAddress: String!, $password: String!) {\n    signIn(emailAddress: $emailAddress, password: $password) {\n      id\n      emailAddress\n      firstName\n      lastName\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation SignUp(\n    $firstName: String!\n    $lastName: String!\n    $emailAddress: String!\n    $password: String!\n  ) {\n    signUp(\n      firstName: $firstName\n      lastName: $lastName\n      emailAddress: $emailAddress\n      password: $password\n    ) {\n      id\n      emailAddress\n    }\n  }\n"): (typeof documents)["\n  mutation SignUp(\n    $firstName: String!\n    $lastName: String!\n    $emailAddress: String!\n    $password: String!\n  ) {\n    signUp(\n      firstName: $firstName\n      lastName: $lastName\n      emailAddress: $emailAddress\n      password: $password\n    ) {\n      id\n      emailAddress\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Flows {\n    myProfile {\n      flows {\n        id\n        flowName\n        tickets {\n          id\n          date\n          orderNumber\n          status\n          isTrash\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query Flows {\n    myProfile {\n      flows {\n        id\n        flowName\n        tickets {\n          id\n          date\n          orderNumber\n          status\n          isTrash\n        }\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;