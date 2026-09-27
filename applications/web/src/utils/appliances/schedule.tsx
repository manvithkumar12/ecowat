export const handleApplianceChange = (
  val: string,
  setAddname: (val: string) => void,
  setAddRating: (val: string) => void,
  Availableappliances: any,
) => {
  setAddname(val);
  const selected = Availableappliances?.find((a: any) => a.name === val);
  if (selected?.powerRatingW) {
    setAddRating(selected.powerRatingW.toString());
  }
};
