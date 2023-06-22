import { gql } from '@apollo/client';

/* Authentification */

export const SIGN_UP = gql`
  mutation SignUp(
    $firstName: String!
    $lastName: String!
    $emailAddress: String!
    $password: String!
  ) {
    signUp(
      firstName: $firstName
      lastName: $lastName
      emailAddress: $emailAddress
      password: $password
    ) {
      id
      emailAddress
    }
  }
`;

export const SIGN_IN = gql`
  mutation SignIn($emailAddress: String!, $password: String!) {
    signIn(emailAddress: $emailAddress, password: $password) {
      id
      emailAddress
      firstName
      lastName
    }
  }
`;

export const LOGOUT = gql`
  mutation LogOut {
    logOut {
      id
    }
    removeCookie
  }
`;

/* Profile */

export const MY_PROFILE = gql`
  query Myprofile {
    myProfile {
      id
      firstName
      flows {
        flowName
        id
        date
        calculateTicketCounts {
          incident
          nonScanned
          validate
          waiting
        }
      }
    }
  }
`;

/* Flow */

export const ADD_FLOW = gql`
  mutation addFlow($id: String!, $flowName: String!) {
    addFlow(id: $id, flowName: $flowName) {
      id
      flowName
    }
  }
`;

export const DELETE_FLOW = gql`
  mutation deleteFlow($arrayId: [String!]!) {
    deleteFlow(arrayId: $arrayId)
  }
`;

/* Tickets queries*/
export const GET_TICKETS_BY_FLOW_ID = gql`
  query GetTicketsByFlowId($flowId: String!) {
    getTicketsByFlowId(flowId: $flowId) {
      flowName
      id
      tickets {
        date
        id
        isTrash
        status
      }
    }
  }
`;

export const GET_TICKET_BY_ID = gql`
  query getTicketById($id: String!) {
    getTicketById(id: $id) {
      isTrash
      id
      status
    }
  }
`;

/* Tickets Mutations */

export const DELETE_TICKETS_BY_ID = gql`
  mutation DeleteTickets($arrayId: [String!]!) {
    deleteTickets(arrayId: $arrayId)
  }
`;

export const ADD_TICKET_BY_FLOW_ID = gql`
  mutation AddTicketByFlowId($flowId: String!) {
    addTicketByFlowId(flowId: $flowId) {
      date
      id
      isTrash
      status
    }
  }
`;

export const CHANGE_TICKET_STATUS_BY_ID = gql`
  mutation ChangeTicketStatus($id: String!, $status: String!) {
    changeTicketStatus(id: $id, status: $status) {
      date
      id
      status
    }
  }
`;

export const CHANGE_TICKETS_STATUS_BY_IDS = gql`
  mutation ChangeTicketsStatus($arrayId: [ID!]!, $status: String!) {
    changeTicketsStatus(arrayId: $arrayId, status: $status) {
      id
      date
      status
    }
  }
`;

export const IS_TRASH_TICKETS_BY_IDS = gql`
  mutation ChangeTicketIsTrash($arrayId: [ID!]!, $isTrash: Boolean!) {
    changeTicketIsTrash(arrayId: $arrayId, isTrash: $isTrash) {
      date
      id
      isTrash
      status
    }
  }
`;

/* Subscription */

export const SUBSCRIPTION_WITH_IDs = gql`
  subscription SubscriptionWithIds($ids: [String!]) {
    subscriptionWithId(ids: $ids) {
      id
      message
    }
  }
`;

export const SUBSCRIPTION_WITH_ID = gql`
  subscription SubscriptionWithId($id: String!) {
    subscriptionWithId(id: $id) {
      id
      message
    }
  }
`;
