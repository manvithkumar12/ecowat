export function getGermanHour() {
  return Number(
    new Intl.DateTimeFormat("en-GB", {
      hour: "numeric",
      hour12: false,
      timeZone: "Europe/Berlin",
    }).format(new Date()),
  );
}

export function getGreeting() {
  const hours = getGermanHour();

  if (hours < 12) {
    return "Good Morning";
  }

  if (hours < 18) {
    return "Good Afternoon";
  }

  return "Good Evening";
}
