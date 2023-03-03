import { useState, useContext, useEffect } from 'react';
import {
  MainContainer,
  ButtonAdd,
  AllStatusContainer,
  ArrayContainer,
  ContainerInputItem,
  Divider,
  HeaderList,
  InputItem,
  ItemList,
  ListContainer,
  StatusContainer,
  StatusNoScan,
  TextElement,
  TextElementHeader,
  ButtonDelete,
} from 'pages/MesFlux/MesFlux.styled';
import {
  ButtonAction,
  ContainerButton,
  ContainerButtonAction,
} from './Tickets.styled';
import { GoTrashcan } from 'react-icons/go';
import { IoIosPlay } from 'react-icons/io';
import {
  COLOR_ERROR_TICKET,
  COLOR_VALIDATE_TICKET,
  COLOR_WAITING_TICKET,
} from 'styles/style-constants';
import { gql, useQuery } from '@apollo/client';
import { GetTicketsByFlowIdQuery } from 'gql/graphql';
import { AppContext } from 'context/AppContext';

const GET_TICKETS_BY_FLOW_ID = gql`
  query GetTicketsByFlowId($flowId: String!) {
    getTicketsByFlowId(flowId: $flowId) {
      flowName
      id
      tickets {
        date
        id
        isTrash
        orderNumber
        status
      }
    }
  }
`;

const Tickets = () => {
  const appContext = useContext(AppContext);
  const { data, refetch } = useQuery<GetTicketsByFlowIdQuery>(
    GET_TICKETS_BY_FLOW_ID
  );
  const [flowTickets, setFlowTickets] = useState<{
    __typename?: 'Flow' | undefined;
    flowName: string;
    id: string;
    tickets: {
      __typename?: 'Ticket' | undefined;
      date: any;
      id: string;
      isTrash: boolean;
      orderNumber: number;
      status: string;
    }[];
  }>();
  const [allTicketsSelected] = useState<Array<string>>([]);

  useEffect(() => {
    refetch({ flowId: appContext?.selectedFlow?.value });
    if (data) {
      setFlowTickets(data.getTicketsByFlowId);
    }
  }, [appContext?.selectedFlow?.value, data, refetch]);

  return (
    <MainContainer>
      <ContainerButton>
        <ContainerButtonAction>
          <ButtonDelete disabled={allTicketsSelected.length > 0 ? false : true}>
            <GoTrashcan size={25} /> &ensp;Supprimer
          </ButtonDelete>
          <ButtonAction disabled={allTicketsSelected.length > 0 ? false : true}>
            {allTicketsSelected.length > 0 ? (
              <IoIosPlay size={25} style={{ color: COLOR_WAITING_TICKET }} />
            ) : (
              <IoIosPlay size={25} />
            )}
            &ensp;En attente
          </ButtonAction>
          <ButtonAction disabled={allTicketsSelected.length > 0 ? false : true}>
            {allTicketsSelected.length > 0 ? (
              <IoIosPlay size={25} style={{ color: COLOR_VALIDATE_TICKET }} />
            ) : (
              <IoIosPlay size={25} />
            )}
            &ensp;Valider
          </ButtonAction>
          <ButtonAction disabled={allTicketsSelected.length > 0 ? false : true}>
            {allTicketsSelected.length > 0 ? (
              <IoIosPlay size={25} style={{ color: COLOR_ERROR_TICKET }} />
            ) : (
              <IoIosPlay size={25} />
            )}
            &ensp;Incident
          </ButtonAction>
        </ContainerButtonAction>
        <ButtonAdd>Ajouter un ticket</ButtonAdd>
      </ContainerButton>
      <ArrayContainer>
        <HeaderList>
          <TextElementHeader></TextElementHeader>
          <TextElementHeader>Date</TextElementHeader>
          <TextElementHeader>Numéro</TextElementHeader>
          <TextElementHeader>Statut</TextElementHeader>
          <TextElementHeader></TextElementHeader>
        </HeaderList>
        <Divider />
        <ListContainer>
          {flowTickets
            ? flowTickets.tickets
                .filter((ticket) => ticket.isTrash === false)
                .map((ticket) => {
                  return (
                    <ItemList key={ticket.id}>
                      <ContainerInputItem>
                        <InputItem></InputItem>
                      </ContainerInputItem>
                      <TextElement>15/10/22 11:35:56</TextElement>
                      <TextElement>{ticket.orderNumber}</TextElement>
                      <AllStatusContainer>
                        <StatusContainer>
                          <StatusNoScan></StatusNoScan>0
                        </StatusContainer>
                      </AllStatusContainer>
                    </ItemList>
                  );
                })
            : null}
        </ListContainer>
      </ArrayContainer>
    </MainContainer>
  );
};

export default Tickets;
