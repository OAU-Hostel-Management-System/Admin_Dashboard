import { useState , useEffect, useRef} from 'react'
import React from 'react'
import axios from 'axios'
import Shimmer  from '../../components/skeleton/shimer'
import Navbar from '../../components/navbar'

const rawJson = []

  function Dashboard() {
    const [showlist, setShow] = useState(false);
    const [hostelList, setHostel] = useState(rawJson);
    const [showSideBar, setShowSideBar] = useState(false);

    // infinite scroll
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);
    const elementRef = useRef(null);

    const url = `https://hmsbackend-c36l.onrender.com/admin/getHostelRecord?page=${page}`;
    const token = sessionStorage.getItem("authToken");
    const headers = {
      Authorization: `${token} `,
    };

    function fetchMoreItems() {
      axios
        .get(url, { headers })
        .then((res) => {
          if (res.data.success) {
            let list = res.data.data;
            //  setHostel(list)
            setShow(true);
            console.log("the list", list);
            // console.log("======>", res.data);
            // new
            if (list.length == 0) {
              setHasMore(false);
              console.log("list.length", list.length);
            } else {
              setHostel((prevProducts) => [...prevProducts, ...list]);
              setPage((prevPage) => prevPage + 1);
              console.log("list.length", list.length);
              console.log("This is the page count ====> ", page);
            }
          }
        }).catch((err) => console.log("error ", err));
    }

    function onIntersection(entries) {
      const firstEntry = entries[0];
      if (firstEntry.isIntersecting && hasMore) {
        fetchMoreItems();
      }
    }

    useEffect(() => {
      // BigSam
      const observer = new IntersectionObserver(onIntersection);
      if (observer && elementRef.current) {
        observer.observe(elementRef.current);
      }

      // cleanup ftn
      return () => {
        if (observer) {
          observer.disconnect();
        }
      };
    }, [hostelList]);

    return (
      <div>
        <section className="bg-white lmx-3 flex flex-col justify-center rounded-lg">
          <div className="flex justify-center">
            {showlist ? (
              <table className="h-10/12 w-full responsive-table">
                {/* <thead className='text-center text-blue-900'>
          <th className='px-10 py-4 border-b'>Hostel</th>
          <th className='px-10 py-4 border-b'>Blocks</th>
          <th className='px-10 py-3 border-b'>Rooms</th>
          <th className='px-10 py-3 border-b'>Allocated</th>
          <th className='px-10 py-3 border-b'>Bedspace</th>
        </thead> */}
                <thead className="text-center text-white bg-blue-900">
                  <th className="px-10 py-4 border-b">Hostel</th>
                  <th className="px-10 py-4 border-b">Blocks</th>
                  <th className="px-10 py-3 border-b">Rooms</th>
                  <th className="px-10 py-3 border-b">Bedpsace</th>
                  <th className="px-10 py-3 border-b">Allocated</th>
                </thead>
                <tbody>
                  {hostelList.map((data, index) => (
                    <tr key={index} className="text-center border-b py-5">
                      <td className=" py-3 ">{data.hostel_name}</td>
                      <td className=" py-3 ">{data.block}</td>
                      <td className=" py-3 ">{data.roomNo}</td>
                      <td className=" py-3 ">{data.bedNo}</td>
                      <td className=" py-3 ">
                        {data.allocated ? "True" : "false"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <Shimmer />
            )}
          </div>
          {hasMore && (
            <div
              ref={elementRef}
              className=" mt-4 text-blue-500"
              style={{ textAlign: "center" }}
            >
              Loading more items...
            </div>
          )}
        </section>
      </div>
    );
  }

export default Dashboard