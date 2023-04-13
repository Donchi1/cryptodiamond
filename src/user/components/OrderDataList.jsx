import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import * as Icons from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { mobileData } from "../../New-Project/products/tempFile/TestFile";

export default function OrderDatalist() {
  const navigate = useNavigate();

  const [orderData, setOrderData] = useState(mobileData);

  const handleDelete = (id) => {
    //api call for delete
    setOrderData((prev) => prev.filter((each) => each.id !== id));
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
              src={params.row.img}
              alt="pics"
              className="w-12 rounded-full h-12"
            />
            {params.row.name}
          </div>
        );
      },
    },
    {
      field: "price",
      headerName: "Price",
      width: 100,
      renderCell: (params) => <span>${params.row.price}</span>,
    },
    {
      field: "address",
      headerName: "Address",
      width: 150,
    },
    {
      field: "quantity",
      headerName: "Quantity",
      width: 130,
    },
    {
      field: "inStock",
      headerName: "Instock",
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
              onClick={() => navigate(`/admin/Orders/edit/${params.row.id}`)}
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
      rows={orderData}
      checkboxSelection
      pageSize={8}
      disableSelectionOnClick
      onRowClick={() => {}}
      className="dark:text-gray-300 bg-gray-50 dark:bg-gray-800"
    ></DataGrid>
  );
}
