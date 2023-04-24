/* eslint-disable @typescript-eslint/no-unused-vars */
import { useParams } from 'react-router-dom';
import { gql, useSubscription } from '@apollo/client';
import { SubscriptionSubscriptionWithIdArgs } from 'gql/graphql';


const TicketClient = () => {
  const { id } = useParams();

  // const GET_STATUS_TICKET = gql`
  //   query getTicketById($getTicketByIdId: String!) {
  //     getTicketById(id: $getTicketByIdId) {
  //       status
  //       id
  //     }
  //   }
  // `;

  const SUBSCRIPTION_WITH_ID = gql`
    subscription Subscription($id: String) {
      subscriptionWithId(id: $id) {
        message
        id
      }
    }
  `;

  const { data, loading, variables } =
    useSubscription<SubscriptionSubscriptionWithIdArgs>(SUBSCRIPTION_WITH_ID, {
      variables: { id },
    });
  console.log(data);

  return (
    <div>
    </div>
  );
};

export default TicketClient;
