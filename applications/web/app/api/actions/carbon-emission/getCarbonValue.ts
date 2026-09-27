import { prisma } from "@/lib/prisma";

const toMinutes = (time?: string) => {
  if (!time) return 0;
  const [hour = 0, minute = 0] = time.replace(".", ":").split(":").map(Number);

  return (isNaN(hour) ? 0 : hour) * 60 + (isNaN(minute) ? 0 : minute);
};

const toTimeString = (time?: string) => {
  if (!time) return "00:00";
  const minutes = toMinutes(time);
  const hour = Math.floor(minutes / 60);
  const minute = minutes % 60;

  return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
};

export const getCarbonValue = async (
  date?: string,
  startHour?: string,
  endHour?: string,
) => {
  if (!date || !startHour || !endHour) {
    return null;
  }
  const start = toTimeString(startHour);
  const end = toTimeString(endHour);

  const carbonValues = await prisma.carbonEmission.findMany({
    where: {
      date,
      timeStart: { lt: end },
      timeStop: { gt: start },
    },
    orderBy: {
      timeStart: "asc",
    },
  });

  const scheduleStartMinutes = toMinutes(start);
  const scheduleEndMinutes = toMinutes(end);

  let totalOverlapMinutes = 0;
  let weightedCarbonIntensity = 0;

  for (const slot of carbonValues) {
    const slotStartMinutes = toMinutes(slot.timeStart);
    const slotEndMinutes = toMinutes(slot.timeStop);

    const overlapStart = Math.max(scheduleStartMinutes, slotStartMinutes);

    const overlapEnd = Math.min(scheduleEndMinutes, slotEndMinutes);

    const overlapMinutes = Math.max(0, overlapEnd - overlapStart);

    totalOverlapMinutes += overlapMinutes;
    weightedCarbonIntensity += slot.carbonIntensity * overlapMinutes;
  }

  if (totalOverlapMinutes === 0) {
    return null;
  }
  return Number((weightedCarbonIntensity / totalOverlapMinutes).toFixed(2));
};
