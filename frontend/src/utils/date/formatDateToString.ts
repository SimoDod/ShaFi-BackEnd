import { isDate, format, isValid, parseISO } from "date-fns";

export const dateFormats = {
  default: "dd/MM/yyyy",
  complete: "yyyy-MM-dd'T'HH:mm:ss.SSSxxx",
  displayComplete: "dd/MM/yyyy - HH:mm:ss",
};

const formatDateToString = (
  date: Date | string | null,
  formatType = dateFormats.displayComplete
): string | null => {
  if (!date) return null;

  const parsedDate = typeof date === "string" ? parseISO(date) : date;

  return isDate(parsedDate) && isValid(parsedDate)
    ? format(parsedDate, formatType)
    : null;
};

export default formatDateToString;
