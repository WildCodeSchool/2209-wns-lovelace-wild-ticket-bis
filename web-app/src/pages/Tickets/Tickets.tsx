import { useState, useContext, useEffect } from 'react';
import {
  MainContainer,
  ButtonAdd,
  SecondaryButton,
} from 'pages/MesFlux/MesFlux.styled';
import {
  ButtonAction,
  ContainerButton,
  ContainerButtonAction,
} from './Tickets.styled';
import {
  COLOR_ERROR_TICKET,
  COLOR_VALIDATE_TICKET,
  COLOR_WAITING_TICKET,
} from 'styles/style-constants';
import {
  AddTicketByFlowIdMutation,
  AddTicketByFlowIdMutationVariables,
  ChangeTicketIsTrashMutation,
  ChangeTicketIsTrashMutationVariables,
  ChangeTicketsStatusMutation,
  ChangeTicketStatusMutation,
  GetTicketsByFlowIdQuery,
} from 'gql/graphql';
import { GoTrashcan } from 'react-icons/go';
import { IoIosPlay } from 'react-icons/io';
import { gql, useMutation, useQuery } from '@apollo/client';
import { AppContext } from 'context/AppContext';
import { toast } from 'react-toastify';
import TicketsArray from 'components/TicketsArray/TicketsArray';

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

export const DELETE_TICKETS_BY_ID = gql`
  mutation DeleteTickets($arrayId: [String!]!) {
    deleteTickets(arrayId: $arrayId)
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

const IS_TRASH_TICKETS_BY_IDS = gql`
  mutation ChangeTicketIsTrash($arrayId: [ID!]!, $isTrash: Boolean!) {
    changeTicketIsTrash(arrayId: $arrayId, isTrash: $isTrash) {
      date
      id
      isTrash
      status
    }
  }
`;

export type Flow = {
  __typename?: 'Flow' | undefined;
  flowName: string;
  id: string;
  tickets: {
    __typename?: 'Ticket' | undefined;
    date: string;
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

  const [changeticketStatus] = useMutation<ChangeTicketStatusMutation>(
    CHANGE_TICKET_STATUS_BY_ID
  );

  const [changeTicketsStatusbyIds] = useMutation<ChangeTicketsStatusMutation>(
    CHANGE_TICKETS_STATUS_BY_IDS
  );
  const [isTrashTicketsByIds] = useMutation<
    ChangeTicketIsTrashMutation,
    ChangeTicketIsTrashMutationVariables
  >(IS_TRASH_TICKETS_BY_IDS);

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
      setAllTicketsSelected([]);
      setIsButtonDisabled(true);
    } catch {
      toast.error('Un problème est survenue, veuillez réessayer');
    }
  };

  const changeIsTrashInTicketsList = async (isTrash: boolean) => {
    try {
      await isTrashTicketsByIds({
        variables: { arrayId: allTicketsSelected, isTrash: isTrash },
      });
      refetch();
      setIsButtonDisabled(false);
    } catch {
      toast.error('Un problème est survenue. Veuillez réessayer');
    }
  };

  return (
    <MainContainer>
      <ContainerButton>
        <ContainerButtonAction>
          <SecondaryButton
            disabled={isButtonDisabled}
            onClick={() => changeIsTrashInTicketsList(true)}
          >
            <GoTrashcan size={25} opacity={0.7} /> &ensp;Supprimer
          </SecondaryButton>
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
      <TicketsArray
        flowTickets={flowTickets}
        allTicketsSelected={allTicketsSelected}
        updateListOfTickets={updateListOfTickets}
        quicklyChangeStatus={quicklyChangeStatus}
        isTicketFromTrash={false}
      />
    </MainContainer>
  );
};

export default Tickets;
