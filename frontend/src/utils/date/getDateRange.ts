const getDateRange = (monthsPast: number, monthsFeature: number) => {
  const currentDate = new Date();

  const pastDate = new Date(currentDate);
  pastDate.setMonth(pastDate.getMonth() - monthsPast);

  const futureDate = new Date(currentDate);
  futureDate.setMonth(futureDate.getMonth() + monthsFeature);

  return {
    pastDate,
    futureDate,
  };
};

export default getDateRange;
