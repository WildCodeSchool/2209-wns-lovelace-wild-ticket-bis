import { Ticket } from 'gql/graphql';
import {
  AllStatusContainer,
  ArrayContainer,
  ContainerInputItem,
  Divider,
  HeaderList,
  InputItem,
  ItemList,
  ListContainer,
  StatusContainer,
  StatusError,
  StatusNoScan,
  StatusValidate,
  StatusWaiting,
  TextElement,
  TextElementHeader,
} from 'pages/MesFlux/MesFlux.styled';
import {
  TextElementBold,
  ButtonQuickChange,
} from 'pages/Tickets/Tickets.styled';
import { CiPlay1 } from 'react-icons/ci';
import { TITLE_FONT_COLOR } from 'styles/style-constants';
import { convertDateFormat } from 'utils';

const TicketsArray = ({
  flowTickets,
  allTicketsSelected,
  setListOfTickets,
  quicklyChangeStatus,
}: any) => {
  const convertIdFormat = (id: string) => {
    const shortId = id.toUpperCase().split('');
    shortId.splice(5, shortId.length).join('');
    return shortId;
  };

  return (
    <>
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
                .filter((ticket: Ticket) => ticket.isTrash === false)
                .reverse()
                .map((ticket: Ticket) => {
                  return (
                    <ItemList key={ticket.id}>
                      <ContainerInputItem>
                        <InputItem
                          type="checkbox"
                          data-testid={ticket.id}
                          checked={allTicketsSelected.includes(ticket.id)}
                          onChange={(e) => setListOfTickets(ticket.id, e)}
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
    </>
  );
};

export default TicketsArray;
