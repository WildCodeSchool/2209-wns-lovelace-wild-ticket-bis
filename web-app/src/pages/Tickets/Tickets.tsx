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
import { gql, useMutation, useQuery } from '@apollo/client';
import {
  AddTicketByFlowIdMutation,
  AddTicketByFlowIdMutationVariables,
  GetTicketsByFlowIdQuery,
} from 'gql/graphql';
import { AppContext } from 'context/AppContext';
import { toast } from 'react-toastify';

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

const ADD_MUTATION_BY_FLOW_ID = gql`
  mutation AddTicketByFlowId($flowId: String!) {
    addTicketByFlowId(flowId: $flowId) {
      date
      id
      isTrash
      status
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
    status: string;
  }[];
};

const Tickets = () => {
  const appContext = useContext(AppContext);
  const { data, refetch } = useQuery<GetTicketsByFlowIdQuery>(
    GET_TICKETS_BY_FLOW_ID
  );
  const [addTicketByFlowId] = useMutation<
    AddTicketByFlowIdMutation,
    AddTicketByFlowIdMutationVariables
  >(ADD_MUTATION_BY_FLOW_ID);

  const [flowTickets, setFlowTickets] = useState<Flow>();
  const [allTicketsSelected, setAllTicketsSelected] = useState<Array<string>>(
    []
  );

  const ticketsSelected = (id: string, e: any) => {
    if (e.target.checked) {
      if (!allTicketsSelected.includes(id)) {
        setAllTicketsSelected([...allTicketsSelected, id]);
      }
    } else {
      if (allTicketsSelected.includes(id)) {
        setAllTicketsSelected(
          allTicketsSelected.filter((ticket) => {
            return ticket !== id;
          })
        );
      }
    }
  };

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

  const convertIdFormat = (id: string) => {
    const shortId = id.toUpperCase().split('');
    shortId.splice(5, shortId.length).join('');
    return shortId;
  };

  const addNewTicket = async () => {
    if (!flowTickets?.id) {
      toast.warning('Veuillez sélectionner un flu valide.');
    } else {
      try {
        await addTicketByFlowId({
          variables: { flowId: flowTickets?.id },
        });
        refetch();
      } catch (error) {
        toast.error(
          'Un problème est survenue. Veuillez réessayer ultérieurement.'
        );
      }
    }
  };

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
        <ButtonAdd onClick={addNewTicket}>Ajouter un ticket</ButtonAdd>
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
                        <InputItem
                          type="checkbox"
                          data-testid={ticket.id}
                          onChange={(e) => ticketsSelected(ticket.id, e)}
                        ></InputItem>
                      </ContainerInputItem>
                      <TextElement>
                        {convertDateFormat(ticket.date)}
                      </TextElement>
                      <TextElement>{convertIdFormat(ticket.id)}</TextElement>
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
