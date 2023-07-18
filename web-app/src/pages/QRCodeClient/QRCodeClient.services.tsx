import { Ticket } from 'gql/graphql';

export interface TicketWithSeconds extends Ticket {
  seconds: number;
}

export const extractIds = (
  ticketArray: Array<TicketWithSeconds>,
  setIds: React.Dispatch<React.SetStateAction<string[]>>
) => {
  var idsArray: Array<string> = [];
  for (var i = 0; i < ticketArray.length; i++) {
    var ticket = ticketArray[i];
    idsArray.push(ticket.id);
  }
  setIds(idsArray);
};

export const convertIdFormat = (id: string) => {
  const shortId = id.toUpperCase().split('');
  shortId.splice(5, shortId.length).join('');
  return shortId;
};

export const renderTime = ({ remainingTime }: any) => {
  return (
    <div className="timer">
      <div className="value">{remainingTime}</div>
    </div>
  );
};

/** Fonction pour trier en fonction de la date du tickets
 * +
 * supprime tickets qui sont deja scanner ou dans la corbeille */
export const arraySortedByDate = (array: TicketWithSeconds[]) => {
  return array
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .filter((ticket) => {
      return ticket.status === 'Ticket non scanné' && ticket.isTrash === false;
    });
};
