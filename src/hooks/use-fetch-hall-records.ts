import { useQuery } from "@tanstack/react-query";
import axios from "axios";


interface HallRecords {
  pageCount: number;
  rooms: {
    matric_no: string;
    block: string;
    roomNo: string;
    bedNo: string;
    id: number;
    status: string;
    condition: string;
  }[]
};

const fetchHalls = async (decryptedToken: string, page: number = 1, hall?: string, block?: string, room?: string): Promise<HallRecords> => {

    const queryParams = new URLSearchParams();
    if (hall) queryParams.append("hall", hall);
    if (page) queryParams.append("page", page.toString());
    if (block) queryParams.append("block", block);
    if (room) queryParams.append("room", room);

    const res = await axios.get(
    `${process.env.NEXT_PUBLIC_BASEURL}/admin/hostels/fetch${queryParams.toString() ? `?${queryParams.toString()}` : ""}`,
    {
      headers: {
        Authorization: `Bearer ${decryptedToken}`,
      },
    },
  );
      console.log("Hall recordssss----",res.data);
   
      return res.data.d;
}

export const useFetchHallRecords = (decryptedToken: string, page: number, hall?: string, block?: string, room?: string) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['hallRecords', hall, page, block, room, decryptedToken],
    queryFn: () => fetchHalls(decryptedToken, page, hall, block, room),
  });
  return { hallData: data, hallIsLoading: isLoading, hallIsError: isError, hallError: error };
};