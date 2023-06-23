import { FlowTicket } from './Tickets';

const getRandomNumber = () => {
  return Math.floor(Math.random() * 9000 + 1000);
};

const generateFlowTicket = () => {
  const statuses = [
    'Ticket non scanné',
    'En attente',
    'Ticket validé',
    'Incident',
  ];
  const date = new Date().toLocaleString('fr-FR');
  const number = getRandomNumber();
  const status = statuses[Math.floor(Math.random() * statuses.length)];

  return {
    Date: date,
    Number: number,
    Status: status,
  };
};

export const mockedFlowTickets: FlowTicket[] = Array.from({ length: 50 }, () =>
  generateFlowTicket()
);
