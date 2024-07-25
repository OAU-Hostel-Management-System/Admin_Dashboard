import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface StudentData {
  room: {
    bedNo: string;
    block: string;
    roomNo: string;
    hostel_name: string;
    condition: string;
    status: string;
  };

  student: {
    dept: string;
    faculty: string;
    fullName: string;
    img_url: string;
    matric_no: string;
    paid: boolean;
    part: string;
  };
}

const fetchStudentDetails = async (
  decryptedToken: string,
  matricNoOrId: string,
  type: string
): Promise<StudentData> => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_BASEURL}/admin/getStudentDetail${
      type === "id" ? `?room_id=${matricNoOrId}` : `?matric_no=${matricNoOrId}`
    }`,
    {
      headers: {
        Authorization: `Bearer ${decryptedToken}`,
      },
    }
  );
  console.log("Student Details----", res.data);

  return res.data.d;
};

export const useFetchStudentDetailsWithConstraints = (
  decryptedToken: string,
  matricNoOrId: string,
  type: string
) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["studentDetailsWithConstraints", decryptedToken, matricNoOrId, type],
    queryFn: () =>
      matricNoOrId
        ? fetchStudentDetails(decryptedToken, matricNoOrId, type)
        : Promise.resolve(null),
    enabled: !!matricNoOrId, // Only run the query if matricNoOrId is not empty
  });

  return {
    studentData: data,
    studentIsLoading: isLoading,
    studentIsError: isError,
    studentError: error,
  };
};
