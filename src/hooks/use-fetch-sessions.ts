import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchSessions = async (): Promise<{ session: string }[]> => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_BASEURL}/sessions`
  );
  console.log("Session Details----", res.data);

  return res.data.d;
};

export const useFetchSessions = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["studentSessions"],
    queryFn: () =>
       fetchSessions()
  });

  return {
    sessionData: data,
    sessionIsLoading: isLoading,
    sessionIsError: isError,
    sessionError: error,
  };
};