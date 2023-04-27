import {
  ArrayContainer,
  ContainerInputItem,
  Divider,
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
import { Flow } from 'pages/Tickets/Tickets';
import {
  TextElementBold,
  ButtonQuickChange,
  StatusContainer,
  AllStatusContainer,
} from 'pages/Tickets/Tickets.styled';
import { CiPlay1 } from 'react-icons/ci';
import { TEXT_FONT_COLOR } from 'styles/style-constants';
import { convertDateFormat } from 'utils';

type TicketsArrayProps = {
  flowTickets: Flow | undefined;
  allTicketsSelected: string[];
  updateListOfTickets: (
    id: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  quicklyChangeStatus: (
    ticketId: string,
    ticketStatus: string
  ) => Promise<void>;
  isTicketFromTrash: boolean;
};

const TicketsArray = ({
  flowTickets,
  allTicketsSelected,
  updateListOfTickets,
  quicklyChangeStatus,
  isTicketFromTrash,
}: TicketsArrayProps) => {
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
      <Divider />
      <ListContainer>
        {flowTickets
          ? flowTickets.tickets
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
                        onChange={(e) => updateListOfTickets(ticket.id, e)}
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
                      <StatusContainer>{ticket.status}</StatusContainer>
                    </AllStatusContainer>
                    {(ticket.status === 'Ticket non scanné' ||
                      ticket.status === 'En attente') &&
                    !isTicketFromTrash ? (
                      <ButtonQuickChange
                        whileTap={{ scale: 0.9 }}
                        onClick={() =>
                          quicklyChangeStatus(ticket.id, ticket.status)
                        }
                      >
                        <CiPlay1
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
