import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface RoomDetail {
  bedNo: string;
  block: string;
  roomNo: string;
  hostel_name: string;
  status: string;
  condition: string;
}

interface Student {
  fullName: string;
}

interface Room {
  gender: string;
}

interface StudentRecord {
  matric_no: string;
  room_detail: RoomDetail;
  paid: boolean;
  student: Student;
  room: Room;
}

interface StudentRecordsResponse {
  data: StudentRecord[];
  pageCount: number;
}

// interface StudentRecords {
//   pageCount: number;
//   rooms: {
//     matric_no: string;
//     block: string;
//     roomNo: string;
//     bedNo: string;
//     id: number;
//     status: string;
//     condition: string;
//   }[]
// };


const fetchStudents = async (decryptedToken: string, page: number = 1, hall?: string, block?: string, room?: string, matric_no?: string): Promise<StudentRecordsResponse> => {

    const queryParams = new URLSearchParams();
    if (hall) queryParams.append("hall", hall);
    if (page) queryParams.append("page", page.toString());
    if (block) queryParams.append("block", block);
    if (room) queryParams.append("room", room);
    if (matric_no) queryParams.append("matric_no", encodeURIComponent(matric_no));

    const res = await axios.get(
    `${process.env.NEXT_PUBLIC_BASEURL}/admin/students/fetch${queryParams.toString() ? `?${queryParams.toString()}` : ""}`,
    {
      headers: {
        Authorization: `Bearer ${decryptedToken}`,
      },
    },
  );
      console.log("Student recordssss----",res.data);
   
      return res.data.d;
}

export const useFetchStudentRecords = (decryptedToken: string, page: number, hall?: string, block?: string, room?: string, matric_no?: string) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['studentRecords', hall, page, block, room, decryptedToken, matric_no],
    queryFn: () => fetchStudents(decryptedToken, page, hall, block, room, matric_no),
  });
  return { studentData: data, studentIsLoading: isLoading, studentIsError: isError, studentError: error };
};