
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface HostelData {
  hostel_name: string;
  blocks: any[];
  rooms: any[];
  hostel_abbrv: string;
}

 const fetchFilters = async (decryptedToken: string): Promise<HostelData[]> => {
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BASEURL + "/admin/filters",
    {
      headers: {
        Authorization: `Bearer ${decryptedToken}`,
      },
    }
  );

  console.log("Filters Data -----:", res.data);
  

  return res.data.d;
};


export const useGetFilters = (decryptedToken: string) => {
 const { data, isLoading, isError, error } = useQuery({
    queryKey: ['filters', decryptedToken],
    queryFn: ()=>fetchFilters(decryptedToken),
  })

  return { 
   filterData: data,
    filterIsLoading:isLoading,
     filterIsError:isError,
     filterError:error
     };
};

