import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import * as Icons from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../database/firebaseDb";
import Toast from "../../components/Alert";
//import { userRow } from "../utils/UserData";

export default function UserDatalist({ users }) {
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    //api call for delete
    try {
      await deleteDoc(doc(db, "users", id));
      Toast.success.fire({
        icon: "success",
        text: "user successfully deleted",
      });
    } catch (err) {
      Toast.error.fire({ icon: "error", text: err });
    }
  };
  const column = [
    { field: "uid", headerName: "Id", width: 90 },
    {
      field: "name",
      headerName: "User",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="flex gap-4 items-center  ">
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
      field: "gender",
      headerName: "Gender",
      width: 200,
    },
    {
      field: "occupation",
      headerName: "Occupation",
      width: 200,
    },
    {
      field: "country",
      headerName: "Country",
      width: 200,
    },
    {
      field: "totalBalance",
      headerName: "TotalB",
      width: 200,
    },
    {
      field: "initialDeposit",
      headerName: "Deposites",
      width: 200,
    },

    {
      field: "state",
      headerName: "State",
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
              onClick={() => navigate(`/adm/users/edit/${params.row.id}`)}
              className=" text-white px-4 py-2  outline-none border-none rounded-full bg-green-400"
            >
              Edit
            </button>
            <Icons.BsTrash
              onClick={() => handleDelete(params.row.uid)}
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
      rows={users}
      checkboxSelection
      pageSize={8}
      disableSelectionOnClick
      autoHeight
      onRowClick={() => {}}
      className="bg-primary2 h-screen !text-white "
    ></DataGrid>
  );
}
