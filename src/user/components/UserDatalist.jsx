import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import * as Icons from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { userRow } from "../utils/UserData";

export default function UserDatalist() {
  const navigate = useNavigate();

  const [userData, setUserData] = useState(userRow);

  const handleDelete = (id) => {
    //api call for delete
    setUserData((prev) => prev.filter((each) => each.id !== id));
  };
  const column = [
    { field: "id", headerName: "Id", width: 90 },
    {
      field: "name",
      headerName: "User",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="flex gap-4 items-center ">
            <img
              src={params.row.img}
              alt="pics"
              className="w-12 rounded-full h-12"
            />
            {params.row.firstname} {params.row.lastname}
          </div>
        );
      },
    },
    {
      field: "email",
      headerName: "Email",
      width: 200,
    },
    {
      field: "phone",
      headerName: "Phone",
      width: 150,
    },
    {
      field: "status",
      headerName: "status",
      width: 130,
    },
    {
      field: "transaction",
      headerName: "Transaction",
      width: 200,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <button
              onClick={() => navigate(`/admin/users/edit/${params.row.id}`)}
              className=" text-white px-4 py-2  outline-none border-none rounded-full bg-green-400"
            >
              Edit
            </button>
            <Icons.Trash
              onClick={() => handleDelete(params.row.id)}
              size={24}
              className="cursor-pointer text-red-500 ml-4"
            />
          </>
        );
      },
    },
  ];

  return (
    <DataGrid
      columns={column}
      rows={userData}
      checkboxSelection
      pageSize={8}
      disableSelectionOnClick
      onRowClick={() => {}}
      className="dark:text-gray-300 bg-gray-50 dark:bg-gray-800"
    ></DataGrid>
  );
}
