import React, { useEffect, useState } from "react";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import moment from "moment";
import { MdModeEdit } from "react-icons/md";
import ChangeUserRole from "../components/ChangeUserRole";

const AllUsers = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [openUpdateRole, setOpenUpdateRole] = useState(false);
  const [updateUserDetails, setUpdateUserDetails] = useState({
    email: "",
    name: "",
    role: "",
    _id: "",
  });

  const fetchAllUsers = async () => {
    const fetchData = await fetch(SummaryApi.AllUser.url, {
      method: SummaryApi.AllUser.method,
      credentials: "include",
    });
    const dataResponse = await fetchData.json();
    console.log(dataResponse);
    if (dataResponse.success) {
      setAllUsers(dataResponse.data);
    }
    if (dataResponse.error) {
      toast.error(dataResponse.message);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error}</div>;

  return (
    <div className="bg-white pb-4">
      <table className="w-full userTable">
        <thead>
          <tr className="bg-black text-white">
            <th>Sr.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created At</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {allUsers.map((el, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{el?.name}</td>
                <td>{el?.email}</td>
                <td>{el?.role}</td>
                <td>{moment(el?.createdAt).format("LLL")}</td>
                <td>
                  <button
                    className="bg-green-100 p-2 rounded-full cursor-pointer hover:text-white hover:bg-green-500"
                    onClick={() => {
                      setUpdateUserDetails(el);
                      setOpenUpdateRole(true);
                    }}
                  >
                    <MdModeEdit />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {openUpdateRole && (
        <ChangeUserRole
          onClose={() => setOpenUpdateRole(false)}
          name={updateUserDetails.name}
          email={updateUserDetails.email}
          role={updateUserDetails.role}
          userId={updateUserDetails._id}
          callFunc={fetchAllUsers}
        />
      )}
    </div>
  );
};

export default AllUsers;
