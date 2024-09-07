import React, { useState } from "react";
import ROLE from "../common/role";
import { MdClose } from "react-icons/md";
import SummaryApi from "../common";
import { toast } from "react-toastify";

const ChangeUserRole = ({ name, email, role, userId, onClose, callFunc }) => {
  const [userRole, setUserRole] = useState(role);

  const handleOnChangeSelect = (e) => {
    setUserRole(e.target.value);
    console.log(e.target.value);
  };

  const updateUserRole = async () => {
    const fetchResponse = await fetch(SummaryApi.UpdateUser.url, {
      method: SummaryApi.UpdateUser.method,
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Ensure credentials are sent with the request
      body: JSON.stringify({
        userId: userId,
        role: userRole,
      }),
    });
    const dataResponse = await fetchResponse.json();

    if (dataResponse.success) {
      toast.success(dataResponse.message);
      onClose();
      callFunc();
    }
    console.log("ROLE UPDATED", dataResponse);
  };
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 w-full h-full z-10 flex justify-center items-center bg-slate-200 bg-opacity-50">
      <div className="mx-auto bg-white shadow-md p-4 w-full max-w-sm">
        <button
          className="block ml-auto mb-4"
          onClick={() => {
            onClose();
          }}
        >
          <MdClose />
        </button>
        <h1 className="pb-4 text-lg font-medium">Change User Role</h1>
        <p>Name : {name}</p>
        <p>Email : {email}</p>
        <div className="flex items-center justify-between my-4">
          <p>Role : </p>
          <select
            className="border px-4 py-1"
            value={userRole}
            onChange={handleOnChangeSelect}
          >
            {Object.values(ROLE).map((el, index) => {
              return (
                <option key={index} value={el}>
                  {el}
                </option>
              );
            })}
          </select>
        </div>

        <button
          className="w-fit mx-auto block py-1 px-3 rounded-full bg-green-500 text-white hover:bg-green-600"
          onClick={updateUserRole}
        >
          Change Role
        </button>
      </div>
    </div>
  );
};

export default ChangeUserRole;
