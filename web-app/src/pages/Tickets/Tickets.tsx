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
  ButtonQuickChange,
  TextElementBold,
} from './Tickets.styled';
import { GoTrashcan } from 'react-icons/go';
import { IoIosPlay } from 'react-icons/io';
import { CiPlay1 } from 'react-icons/ci';
import {
  COLOR_ERROR_TICKET,
  COLOR_VALIDATE_TICKET,
  COLOR_WAITING_TICKET,
  TITLE_FONT_COLOR,
} from 'styles/style-constants';
import { gql, useMutation, useQuery } from '@apollo/client';
import {
  AddTicketByFlowIdMutation,
  AddTicketByFlowIdMutationVariables,
  ChangeTicketsStatusMutation,
  ChangeTicketStatusMutation,
  DeleteTicketsMutation,
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

const ADD_TICKET_BY_FLOW_ID = gql`
  mutation AddTicketByFlowId($flowId: String!) {
    addTicketByFlowId(flowId: $flowId) {
      date
      id
      isTrash
      status
    }
  }
`;

const DELETE_TICKETS_BY_ID = gql`
  mutation DeleteTickets($arrayId: [String!]!) {
    deleteTickets(arrayId: $arrayId)
  }
`;

const CHANGE_TICKET_STATUS_BY_ID = gql`
  mutation ChangeTicketStatus($id: String!, $status: String!) {
    changeTicketStatus(id: $id, status: $status) {
      date
      id
      status
    }
  }
`;

const CHANGE_TICKETS_STATUS_BY_IDS = gql`
  mutation ChangeTicketsStatus($arrayId: [ID!]!, $status: String!) {
    changeTicketsStatus(arrayId: $arrayId, status: $status) {
      id
      date
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
  >(ADD_TICKET_BY_FLOW_ID);

  const [deleteTicketInTicketListMutation] =
    useMutation<DeleteTicketsMutation>(DELETE_TICKETS_BY_ID);

  const [changeticketStatus] = useMutation<ChangeTicketStatusMutation>(
    CHANGE_TICKET_STATUS_BY_ID
  );

  const [changeTicketsStatusbyIds] = useMutation<ChangeTicketsStatusMutation>(
    CHANGE_TICKETS_STATUS_BY_IDS
  );

  const [flowTickets, setFlowTickets] = useState<Flow>();
  const [allTicketsSelected, setAllTicketsSelected] = useState<Array<string>>(
    []
  );
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const ticketsSelected = (id: string, e: any) => {
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

  useEffect(() => {
    refetch({ flowId: appContext?.selectedFlow?.value });
    if (data) {
      setFlowTickets(data.getTicketsByFlowId);
    }
  }, [appContext?.selectedFlow?.value, data, refetch]);

  const convertDateFormat = (isoDate: string) => {
    const date = new Date(isoDate);
    const dateResult = date.toLocaleDateString('en-Gb', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
    return dateResult;
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

  const deleteTicketsInTicketList = async () => {
    try {
      await deleteTicketInTicketListMutation({
        variables: { arrayId: allTicketsSelected },
      });
      refetch();
      setIsButtonDisabled(true);
    } catch {
      toast.error('Un problème est survenue. Veuillez réessayer');
    }
  };

  const quicklyChangeStatus = async (
    ticketId: string,
    ticketStatus: string
  ) => {
    try {
      if (ticketStatus === 'Ticket non scanné') {
        await changeticketStatus({
          variables: { id: ticketId, status: 'En attente' },
        });
      }
      if (ticketStatus === 'En attente') {
        await changeticketStatus({
          variables: { id: ticketId, status: 'Ticket validé' },
        });
      }
    } catch {
      toast.error('Un problème est survenue, veuillez réessayer');
    }
  };

  const changeTicketsStatus = async (status: string) => {
    try {
      await changeTicketsStatusbyIds({
        variables: { arrayId: allTicketsSelected, status: status },
      });
      refetch();
      setIsButtonDisabled(true);
    } catch {
      toast.error('Un problème est survenue, veuillez réessayer');
    }
  };

  return (
    <MainContainer>
      <ContainerButton>
        <ContainerButtonAction>
          <ButtonDelete
            disabled={isButtonDisabled}
            onClick={deleteTicketsInTicketList}
          >
            <GoTrashcan size={25} /> &ensp;Supprimer
          </ButtonDelete>
          <ButtonAction
            disabled={isButtonDisabled}
            onClick={() => changeTicketsStatus('En attente')}
          >
            <IoIosPlay size={25} style={{ color: COLOR_WAITING_TICKET }} />
            &ensp;En attente
          </ButtonAction>
          <ButtonAction
            disabled={isButtonDisabled}
            onClick={() => changeTicketsStatus('Ticket validé')}
          >
            <IoIosPlay size={25} style={{ color: COLOR_VALIDATE_TICKET }} />
            &ensp;Valider
          </ButtonAction>
          <ButtonAction
            disabled={isButtonDisabled}
            onClick={() => changeTicketsStatus('Incident')}
          >
            <IoIosPlay size={25} style={{ color: COLOR_ERROR_TICKET }} />
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
                .reverse()
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
                      <TextElementBold>
                        {convertIdFormat(ticket.id)}
                      </TextElementBold>
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
                      {ticket.status === 'Ticket non scanné' ||
                      ticket.status === 'En attente' ? (
                        <ButtonQuickChange whileTap={{ scale: 0.9 }}>
                          <CiPlay1
                            size={25}
                            style={{ color: TITLE_FONT_COLOR }}
                            onClick={() =>
                              quicklyChangeStatus(ticket.id, ticket.status)
                            }
                          />
                        </ButtonQuickChange>
                      ) : null}
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
