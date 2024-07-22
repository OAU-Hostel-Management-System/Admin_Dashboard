import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface HostelData {
  block: string;
  gender: string;
  hostel_abbrv: string;
  hostel_name: string;
  max_capacity: number;
  occupied: number;
  unoccupied: number;
};

interface ResDetailsType {
  blocks: string;
  capacity: number;
  warden: string;
  sex: string;
}

const fetchHostels = async (hostel: string | undefined, decryptedToken: string): Promise<{
  hostelSum: HostelData[];
  resDetails: ResDetailsType;
}> => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BASEURL}/admin/dashboard${hostel ? `?hall=${hostel}` : ""}`,
        {
          headers: {
            Authorization: `Bearer ${decryptedToken}`,
          },
        },
      );
      console.log("Home Hostel data ----",res.data);
   
      return {
       hostelSum: res.data.d.hostel_sum,
       resDetails: res.data.d.res_detail
      };
}

export const useFetchHostelData = (hostel: string, decryptedToken: string) => {
    const { data, isLoading, isError, error } = useQuery({
      queryKey: ['hostelData', hostel, decryptedToken],
      queryFn: ()=>fetchHostels(hostel, decryptedToken),
    })
    return {hostelData: data, hostelIsLoading: isLoading, hostelIsError: isError, hostelError: error}
  };