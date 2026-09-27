// utils/germanyTime.ts

export const getGermanHour = (timestamp: number) =>
  Number(
    new Intl.DateTimeFormat("en-GB", {
      hour: "numeric",
      hour12: false,
      timeZone: "Europe/Berlin",
    }).format(new Date(timestamp)),
  );

export const getGermanDate = (timestamp: number) =>
  new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Berlin",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(timestamp));

export const getGermanTime = (timestamp: number) =>
  new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Berlin",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date(timestamp));

export const getGermanNow = () =>
  new Date(
    new Date().toLocaleString("en-US", {
      timeZone: "Europe/Berlin",
    }),
  );


export const getGermanDateString = (date = new Date()) =>
  new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Berlin",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);

export const getGermanDayBounds = (date = new Date()) => {
  const dateStr = getGermanDateString(date); // YYYY-MM-DD
  const tempDate = new Date(`${dateStr}T00:00:00Z`);

  // Calculate Berlin timezone offset in minutes for this date
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "Europe/Berlin",
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
  });

  const parts = formatter.formatToParts(tempDate);
  const getPart = (type: string) => parseInt(parts.find((p) => p.type === type)!.value, 10);

  const year = getPart("year");
  const month = getPart("month") - 1;
  const day = getPart("day");
  const hour = getPart("hour");
  const minute = getPart("minute");
  const second = getPart("second");

  const localAsUTC = Date.UTC(year, month, day, hour, minute, second);
  const tzOffsetMinutes = Math.round((localAsUTC - tempDate.getTime()) / 60000);

  const start = new Date(tempDate.getTime() - tzOffsetMinutes * 60 * 1000);
  const end = new Date(start.getTime() + 24 * 60 * 60 * 1000 - 1);

  return { start, end };
};

export const getGermanDateParts = (dateStr: string) => {
  const parts = dateStr.split("-");
  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);
  const day = parseInt(parts[2], 10);

  const tempDate = new Date(Date.UTC(year, month - 1, day, 12, 0, 0));
  const dayOfWeek = tempDate.getUTCDay();
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

  return { year, month, day, dayOfWeek, isWeekend };
};

