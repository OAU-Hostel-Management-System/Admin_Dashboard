export const formatHostels = (hostelNames: string[]) => {
  const options = hostelNames.map((name) => ({
    value: name.toLowerCase().replace(/\s+/g, "-"),
    label: name,
  }));

  return options;
};

