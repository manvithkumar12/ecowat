export const past30Days = (() => {
  const dates: Date[] = [];
  const today = new Date();

  for (let i = 0; i < 30; i++) {
    const d = new Date();
    d.setDate(today.getDate() - i);
    dates.push(d);
  }

  return dates;
})();
