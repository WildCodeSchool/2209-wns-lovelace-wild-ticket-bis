import { useMutation, useQuery } from '@apollo/client';
import TicketsArray from 'components/TicketsArray/TicketsArray';
import { AppContext } from 'context/AppContext';
import {
  DELETE_TICKETS_BY_ID,
  GET_TICKETS_BY_FLOW_ID,
  IS_TRASH_TICKETS_BY_IDS,
} from 'gql-store';
import {
  ChangeTicketIsTrashMutation,
  ChangeTicketIsTrashMutationVariables,
  DeleteTicketsMutation,
  GetTicketsByFlowIdQuery,
} from 'gql/graphql';
import {
  SecondaryButton,
  ContainerButton,
  MainContainer,
  DeleteText,
} from 'pages/MesFlux/MesFlux.styled';
import { Flow } from 'pages/Tickets/Tickets';
import { ContainerButtonAction } from 'pages/Tickets/Tickets.styled';
import { useContext, useEffect, useState } from 'react';
import { GoTrashcan } from 'react-icons/go';
import { GrTransaction } from 'react-icons/gr';
import { toast } from 'react-toastify';
import { updateListOfTickets } from 'utils';

const Corbeille = () => {
  const appContext = useContext(AppContext);
  const { data, refetch } = useQuery<GetTicketsByFlowIdQuery>(
    GET_TICKETS_BY_FLOW_ID
  );
  const [isTrashTicketsByIds] = useMutation<
    ChangeTicketIsTrashMutation,
    ChangeTicketIsTrashMutationVariables
  >(IS_TRASH_TICKETS_BY_IDS);
  const [deleteTicketInTicketListMutation] =
    useMutation<DeleteTicketsMutation>(DELETE_TICKETS_BY_ID);

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
          <SecondaryButton
            disabled={isButtonDisabled}
            onClick={deleteTicketsInTicketList}
          >
            <GoTrashcan size={25} opacity={0.7} />
            <DeleteText>&ensp;Supprimer définitivement</DeleteText>
          </SecondaryButton>
          <SecondaryButton
            disabled={isButtonDisabled}
            onClick={() => changeIsTrashInTicketsList(false)}
          >
            <GrTransaction size={20} opacity={isButtonDisabled ? 0.2 : 0.7} />
            <DeleteText>&ensp;Transférer dans le flu</DeleteText>
          </SecondaryButton>
        </ContainerButtonAction>
      </ContainerButton>
      <TicketsArray
        flowTickets={flowTickets}
        allTicketsSelected={allTicketsSelected}
        setAllTicketsSelected={setAllTicketsSelected}
        updateListOfTickets={updateListOfTickets}
        quicklyChangeStatus={quicklyChangeStatus}
        isTicketFromTrash={true}
        setIsButtonDisabled={setIsButtonDisabled}
      />
    </MainContainer>
  );
};

export default Corbeille;
