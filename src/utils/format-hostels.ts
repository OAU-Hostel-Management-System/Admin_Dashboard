export const formatHostelsDemo = (hostelNames: string[]) => {
  const options = hostelNames.map((name) => ({
    value: name.toLowerCase().replace(/\s+/g, "-"),
    label: name,
  }));

  return options;
};


type HostelData = {
  hostel_name: string;
  blocks: any[];
  rooms: any[];
  hostel_abbrv: string;
};

export const formatHostels = (data: HostelData[]): { value: string; label: string }[] => {
  return data.map((hostel) => ({
    value: hostel.hostel_abbrv,
    label: hostel.hostel_name,
  }));
};