const getDateAndTime = (dateInput) => {
  const dateInVirginia = new Date(dateInput); // Replace this with your actual date
  const timeZoneIndia = "Asia/Kolkata";

  // Convert the date to India time zone
  const formatterIndia = new Intl.DateTimeFormat("en-US", {
    timeZone: timeZoneIndia,
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZoneName: "short",
  });

  const formattedDateIndia = formatterIndia.format(dateInVirginia);

  return formattedDateIndia;
};

export default getDateAndTime;
