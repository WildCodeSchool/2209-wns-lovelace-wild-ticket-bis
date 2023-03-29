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
