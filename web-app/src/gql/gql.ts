/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

const documents = {
    "\n  query Myprofile {\n    myProfile {\n      id\n      firstName\n      flows {\n        flowName\n        id\n        tickets {\n          orderNumber\n        }\n      }\n    }\n  }\n": types.MyprofileDocument,
    "\n    mutation rdfs($id: String!, $flowName: String!) {\n      addFlow(id: $id, flowName: $flowName) {\n        id\n        flowName\n      }\n    }\n  ": types.RdfsDocument,
    "\n  mutation SignIn($emailAddress: String!, $password: String!) {\n    signIn(emailAddress: $emailAddress, password: $password) {\n      id\n      emailAddress\n      firstName\n      lastName\n    }\n  }\n": types.SignInDocument,
    "\n  mutation SignUp(\n    $firstName: String!\n    $lastName: String!\n    $emailAddress: String!\n    $password: String!\n  ) {\n    signUp(\n      firstName: $firstName\n      lastName: $lastName\n      emailAddress: $emailAddress\n      password: $password\n    ) {\n      id\n      emailAddress\n    }\n  }\n": types.SignUpDocument,
};

export function graphql(source: "\n  query Myprofile {\n    myProfile {\n      id\n      firstName\n      flows {\n        flowName\n        id\n        tickets {\n          orderNumber\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query Myprofile {\n    myProfile {\n      id\n      firstName\n      flows {\n        flowName\n        id\n        tickets {\n          orderNumber\n        }\n      }\n    }\n  }\n"];
export function graphql(source: "\n    mutation rdfs($id: String!, $flowName: String!) {\n      addFlow(id: $id, flowName: $flowName) {\n        id\n        flowName\n      }\n    }\n  "): (typeof documents)["\n    mutation rdfs($id: String!, $flowName: String!) {\n      addFlow(id: $id, flowName: $flowName) {\n        id\n        flowName\n      }\n    }\n  "];
export function graphql(source: "\n  mutation SignIn($emailAddress: String!, $password: String!) {\n    signIn(emailAddress: $emailAddress, password: $password) {\n      id\n      emailAddress\n      firstName\n      lastName\n    }\n  }\n"): (typeof documents)["\n  mutation SignIn($emailAddress: String!, $password: String!) {\n    signIn(emailAddress: $emailAddress, password: $password) {\n      id\n      emailAddress\n      firstName\n      lastName\n    }\n  }\n"];
export function graphql(source: "\n  mutation SignUp(\n    $firstName: String!\n    $lastName: String!\n    $emailAddress: String!\n    $password: String!\n  ) {\n    signUp(\n      firstName: $firstName\n      lastName: $lastName\n      emailAddress: $emailAddress\n      password: $password\n    ) {\n      id\n      emailAddress\n    }\n  }\n"): (typeof documents)["\n  mutation SignUp(\n    $firstName: String!\n    $lastName: String!\n    $emailAddress: String!\n    $password: String!\n  ) {\n    signUp(\n      firstName: $firstName\n      lastName: $lastName\n      emailAddress: $emailAddress\n      password: $password\n    ) {\n      id\n      emailAddress\n    }\n  }\n"];

export function graphql(source: string): unknown;
export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;