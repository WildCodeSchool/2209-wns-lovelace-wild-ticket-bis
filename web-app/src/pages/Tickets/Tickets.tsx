import { useState, useContext, useEffect } from 'react';
import {
  MainContainer,
  ButtonAdd,
  ArrayContainer,
  ContainerInputItem,
  Divider,
  HeaderList,
  InputItem,
  ListContainer,
  StatusNoScan,
  TextElement,
  TextElementHeader,
  ButtonDelete,
  ItemList,
  StatusWaiting,
  StatusError,
  StatusValidate,
} from 'pages/MesFlux/MesFlux.styled';
import {
  AllStatusContainer,
  StatusContainer,
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

type Flow = {
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
};

const Tickets = () => {
  const appContext = useContext(AppContext);
  const { data, refetch } = useQuery<GetTicketsByFlowIdQuery>(
    GET_TICKETS_BY_FLOW_ID
  );
  const [flowTickets, setFlowTickets] = useState<Flow>();
  const [allTicketsSelected] = useState<Array<string>>([]);

  useEffect(() => {
    refetch({ flowId: appContext?.selectedFlow?.value });
    if (data) {
      setFlowTickets(data.getTicketsByFlowId);
    }
  }, [appContext?.selectedFlow?.value, data, refetch]);

  const convertDateFormat = (isoDate: string) => {
    const date = new Date(isoDate);
    return `${date.getDay()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  };

  console.log(console.log(flowTickets));

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
                      <TextElement>
                        {convertDateFormat(ticket.date)}
                      </TextElement>
                      <TextElement>{ticket.orderNumber}</TextElement>
                      <AllStatusContainer>
                        <StatusContainer>
                          {ticket.status === 'Ticket non scanné' ? (
                            <StatusNoScan />
                          ) : ticket.status === 'En attente' ? (
                            <StatusWaiting />
                          ) : ticket.status === 'Incident' ? (
                            <StatusError />
                          ) : ticket.status === 'Ticket validé' ? (
                            <StatusValidate />
                          ) : null}
                        </StatusContainer>
                        <StatusContainer>{ticket.status}</StatusContainer>
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
