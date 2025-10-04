export const monthYearFormate = (date) => {
  if (!date) return "";

  const d = new Date(date);
  const options = { month: "short", year: "numeric" };
  return d.toLocaleDateString("en-GB", options);
};

export const fullDateFormate = (date) => {
  if (!date) return "";
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  return `${year}-${month}-${day}`;
};
