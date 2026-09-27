import { getPriceForHour } from "./pricePerHour";
import { parseTimeToFraction } from "./parseTime";

export const calculateDetailedUsage = (
  ratingW: number,
  startTimeStr: string,
  endTimeStr: string,
  hourlyPrices: any[],
) => {
  if (!ratingW || !startTimeStr || !endTimeStr) {
    return { duration: 0, kwh: 0, totalPrice: 0 };
  }
  let start = parseTimeToFraction(startTimeStr);
  let end = parseTimeToFraction(endTimeStr);

  // If end is less than start, it crosses midnight (spans into next day)
  if (end < start) {
    end += 24;
  }

  const duration = end - start;
  const kwh = (ratingW * duration) / 1000;

  let totalPrice = 0;
  const startHourFloor = Math.floor(start);
  const endHourCeil = Math.ceil(end);

  for (let h = startHourFloor; h < endHourCeil; h++) {
    const slotStart = h;
    const slotEnd = h + 1;

    // Intersect interval [start, end] with [slotStart, slotEnd]
    const overlapStart = Math.max(start, slotStart);
    const overlapEnd = Math.min(end, slotEnd);
    const overlapDuration = overlapEnd - overlapStart;

    if (overlapDuration > 0) {
      const actualHourOfDay = h % 24;
      const priceForHour = getPriceForHour(actualHourOfDay, hourlyPrices);
      const slotKwh = (ratingW * overlapDuration) / 1000;
      totalPrice += slotKwh * priceForHour;
    }
  }

  return {
    duration,
    kwh,
    totalPrice,
  };
};
