export const dateConvector = (date) => {
  if (date) {
    const newDate = new Date(date);
    const formatdate = new Intl.DateTimeFormat("uk-UA", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "Europe/Kyiv", // якщо хочеш час по Україні
    }).format(newDate);
    return formatdate;
  }
};
