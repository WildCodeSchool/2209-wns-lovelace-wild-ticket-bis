import { gql, useQuery } from '@apollo/client';
import TicketsArray from 'components/TicketsArray/TicketsArray';
import { AppContext } from 'context/AppContext';
import { GetTicketsByFlowIdQuery } from 'gql/graphql';
import {
  SecondaryButton,
  ContainerButton,
  MainContainer,
} from 'pages/MesFlux/MesFlux.styled';
import { Flow } from 'pages/Tickets/Tickets';
import { ContainerButtonAction } from 'pages/Tickets/Tickets.styled';
import { useContext, useEffect, useState } from 'react';
import { GoTrashcan } from 'react-icons/go';
import { GrTransaction } from 'react-icons/gr';

const GET_TICKETS_BY_FLOW_ID = gql`
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

const Corbeille = () => {
  const appContext = useContext(AppContext);
  const { data, refetch } = useQuery<GetTicketsByFlowIdQuery>(
    GET_TICKETS_BY_FLOW_ID
  );
  const [flowTickets, setFlowTickets] = useState<Flow>();
  const [allTicketsSelected, setAllTicketsSelected] = useState<Array<string>>(
    []
  );
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  useEffect(() => {
    refetch({ flowId: appContext?.selectedFlow?.value });
    if (data?.getTicketsByFlowId) {
      setFlowTickets(data.getTicketsByFlowId);
    }
  }, [appContext?.selectedFlow?.value, data, refetch]);

  const updateListOfTickets = (
    id: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.checked) {
      setIsButtonDisabled(false);
      if (!allTicketsSelected.includes(id)) {
        setAllTicketsSelected([...allTicketsSelected, id]);
      }
    } else {
      setIsButtonDisabled(true);
      if (allTicketsSelected.includes(id)) {
        setAllTicketsSelected(
          allTicketsSelected.filter((ticket) => {
            return ticket !== id;
          })
        );
      }
    }
  };

  const quicklyChangeStatus = (
    ticketId: string,
    ticketStatus: string
  ): Promise<void> => {
    throw new Error('Function not implemented.');
  };

  return (
    <MainContainer>
      <ContainerButton>
        <ContainerButtonAction>
          <SecondaryButton disabled={isButtonDisabled}>
            <GoTrashcan size={25} opacity={0.7} />
            &ensp;Supprimer définitivement
          </SecondaryButton>
          <SecondaryButton disabled={isButtonDisabled}>
            <GrTransaction size={20} opacity={isButtonDisabled ? 0.2 : 0.7} />
            &ensp;Transférer dans le flu
          </SecondaryButton>
        </ContainerButtonAction>
      </ContainerButton>
      <TicketsArray
        flowTickets={flowTickets}
        allTicketsSelected={allTicketsSelected}
        updateListOfTickets={updateListOfTickets}
        isTicketFromTrash={true}
        quicklyChangeStatus={quicklyChangeStatus}
      />
    </MainContainer>
  );
};

export default Corbeille;
