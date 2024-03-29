import { AppContext } from 'context/AppContext';
import {
  ArrayContainer,
  ContainerInputItem,
  HeaderList,
  InputItem,
  ItemList,
  ListContainer,
  StatusError,
  StatusNoScan,
  StatusValidate,
  StatusWaiting,
  TextElement,
  TextElementHeader,
} from 'pages/MesFlux/MesFlux.styled';

import {
  AllStatusContainer,
  ButtonQuickChange,
  StatusContainer,
  TextElementBold,
  TextStatus,
} from 'pages/Tickets/Tickets.styled';
import { useContext } from 'react';
import { IoPlayOutline } from 'react-icons/io5';
import { TEXT_FONT_COLOR } from 'styles/style-constants';
import { convertDateFormat } from 'utils';

type TicketsArrayProps = {
  allTicketsSelected: string[];
  setAllTicketsSelected: React.Dispatch<React.SetStateAction<string[]>>;
  updateListOfTickets: (
    id: string,
    e: React.ChangeEvent<HTMLInputElement>,
    setIsButtonDisabled: (value: React.SetStateAction<boolean>) => void,
    allTicketsSelected: string[],
    setAllTicketsSelected: (value: React.SetStateAction<string[]>) => void
  ) => void;
  quicklyChangeStatus: (
    ticketId: string,
    ticketStatus: string
  ) => Promise<void>;
  isTicketFromTrash: boolean;
  setIsButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
};

const TicketsArray = ({
  allTicketsSelected,
  setAllTicketsSelected,
  updateListOfTickets,
  quicklyChangeStatus,
  isTicketFromTrash,
  setIsButtonDisabled,
}: TicketsArrayProps) => {
  const appContext = useContext(AppContext);

  const convertIdFormat = (id: string) => {
    const shortId = id.toUpperCase().split('');
    shortId.splice(5, shortId.length).join('');
    return shortId;
  };

  return (
    <ArrayContainer data-testid="tickets-array">
      <HeaderList>
        <TextElementHeader></TextElementHeader>
        <TextElementHeader>Date</TextElementHeader>
        <TextElementHeader>Numéro</TextElementHeader>
        <TextElementHeader>Statut</TextElementHeader>
        <TextElementHeader></TextElementHeader>
      </HeaderList>
      <ListContainer>
        {appContext?.flowTickets
          ? appContext.flowTickets.tickets
              .filter((ticket) => ticket.isTrash === isTicketFromTrash)
              .reverse()
              .map((ticket) => {
                return (
                  <ItemList key={ticket.id}>
                    <ContainerInputItem>
                      <InputItem
                        type="checkbox"
                        data-testid={ticket.id}
                        checked={allTicketsSelected.includes(ticket.id)}
                        onChange={(e) =>
                          updateListOfTickets(
                            ticket.id,
                            e,
                            setIsButtonDisabled,
                            allTicketsSelected,
                            setAllTicketsSelected
                          )
                        }
                      ></InputItem>
                    </ContainerInputItem>
                    <TextElement>{convertDateFormat(ticket.date)}</TextElement>
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
                      <StatusContainer>
                        <TextStatus>{ticket.status}</TextStatus>
                      </StatusContainer>
                    </AllStatusContainer>
                    {(ticket.status === 'Ticket non scanné' ||
                      ticket.status === 'En attente') &&
                    !isTicketFromTrash ? (
                      <ButtonQuickChange
                        data-testid={`button-${ticket.id}`}
                        whileTap={{ scale: 0.9 }}
                        onClick={() =>
                          quicklyChangeStatus(ticket.id, ticket.status)
                        }
                      >
                        <IoPlayOutline
                          size={25}
                          style={{ color: TEXT_FONT_COLOR, opacity: 0.7 }}
                        />
                      </ButtonQuickChange>
                    ) : null}
                  </ItemList>
                );
              })
          : null}
      </ListContainer>
    </ArrayContainer>
  );
};

export default TicketsArray;
