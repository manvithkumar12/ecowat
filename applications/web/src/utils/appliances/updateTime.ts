import { getGermanDate, getGermanTime } from "@ecowat/shared";

export const parseTimeStr = (timeStr: string): number => {
  if (!timeStr) return 0;
  if (timeStr.includes(":")) {
    const [h, m] = timeStr.split(":").map(Number);
    return h + (m || 0) / 60;
  }
  return Number(timeStr) || 0;
};

type TimeProps = {
  setGermanTimeStr: (timeStr: string) => void;
  setGermanDateStr: (dateStr: string) => void;
  setCurrentHour: (hour: number) => void;
};

export const updateTime = ({
  setGermanDateStr,
  setGermanTimeStr,
  setCurrentHour,
}: TimeProps) => {
  const now = Date.now();
  const timeStr = getGermanTime(now);
  setGermanTimeStr(timeStr);
  setGermanDateStr(getGermanDate(now));
  setCurrentHour(parseTimeStr(timeStr));
};
