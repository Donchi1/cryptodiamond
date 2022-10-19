import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import * as Icons from "react-icons/bs";
import { useNavigate } from "react-router-dom";

export default function TransactionDatalist() {
  const navigate = useNavigate();

  const [productData, setProductData] = useState([]);

  const handleDelete = (id) => {
    //api call for delete
    // setProductData((prev) => prev.filter((each) => each.id !== id));
  };
  const column = [
    { field: "id", headerName: "Id", width: 250 },
    {
      field: "name",
      headerName: "Name",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="flex gap-4 items-center ">
            <img
              src={params.row.prove}
              alt="pics"
              className="w-12 rounded-full h-12"
            />
            {params.row.name}
          </div>
        );
      },
    },
    {
      field: "amount",
      headerName: "Amount",
      width: 100,
      renderCell: (params) => <span>${params.row.amount}</span>,
    },
    {
      field: "type",
      headerName: "Type",
      width: 150,
    },
    {
      field: "name",
      headerName: "Name",
      width: 150,
    },
    {
      field: "email",
      headerName: "Email",
      width: 100,
    },
    {
      field: "method",
      headerName: "Method",
      width: 100,
    },
    {
      field: "walletAddress",
      headerName: "Wallet",
      width: 130,
    },
    {
      field: "status",
      headerName: "Status",
      width: 100,
    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <>
            <button
              onClick={() => navigate(`/adm/transaction/edit/${params.row.id}`)}
              className=" text-white px-4 py-2  outline-none border-none rounded-full bg-green-400"
            >
              Edit
            </button>
            <Icons.BsTrash
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
      rows={productData}
      checkboxSelection
      pageSize={8}
      autoHeight
      disableSelectionOnClick
      onRowClick={() => {}}
      className="bg-primary2 border-black text-white"
    ></DataGrid>
  );
}
