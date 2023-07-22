export function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  return String(error);
}

export const convertDateFormat = (isoDate: string) => {
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

export const updateListOfTickets = (
  id: string,
  e: React.ChangeEvent<HTMLInputElement>,
  setIsButtonDisabled: (value: React.SetStateAction<boolean>) => void,
  allTicketsSelected: string[],
  setAllTicketsSelected: (value: React.SetStateAction<string[]>) => void
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

export function addDashes(str: string) {
  const words = str.split(' ');
  const dashedString = words.join('-');
  return dashedString;
}

export type PropsDisplayNavbar = {
  displayNavbar: (isItDisplayed: boolean) => void;
};

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
