export const generateDecreasingYear = () => {
  const currentYear = new Date().getFullYear();
  const dateOptions = [];

  for (let i = 0; i < 10; i++) {
    const startYear = currentYear - i - 1;
    const endYear = startYear + 1;
    const value = `${startYear}/${endYear}`;
    dateOptions.push({ value, label: value });
  }

  return dateOptions;
};