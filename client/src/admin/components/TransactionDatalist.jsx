import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import * as Icons from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { updateDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from "../../database/firebaseDb";
import Toast from "../../components/Alert";
import TimeAgo from "react-timeago";
import useCollectionGroup from "../../components/hooks/UseCollectionGroup";

export default function TransactionDatalist() {
  const navigate = useNavigate();
  const [openEdit, setOpenEdit] = useState(false);
  const [editData, setEditData] = useState({});

  const [transactions, isLoading, isError] =
    useCollectionGroup("transactionDatas");

  const handleDelete = async (item) => {
    try {
      await deleteDoc(
        doc(db, "transactions", item.uid, "transactionDatas", item.id)
      );
      Toast.success.fire({ text: "Document successfully deleted" });
    } catch (error) {
      Toast.error.fire({ text: error.message });
    }
    //api call for delete
    // setProductData((prev) => prev.filter((each) => each.id !== id));
  };

  const handleEdit = (item) => {
    setOpenEdit(true);
    setEditData(item);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      updateDoc(
        doc(db, "transactions", editData.uid, "transactionDatas", editData.id),
        editData
      );
      Toast.success.fire({ text: "Document successfully updated" });
    } catch (error) {
      Toast.error.fire({ text: error.message });
    }
  };
  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const column = [
    {
      field: "name",
      headerName: "Name",
      width: 200,
      renderCell: (params) => {
        return (
          <div className=" ">
            <a
              href={params.row.prove}
              className="inline-flex items-center gap-4"
              download
            >
              <img
                src={params.row.prove}
                alt="pics"
                className="w-12 rounded-full h-12"
              />
              {params.row.name}
            </a>
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
      field: "date",
      headerName: "Date",
      renderCell: (params) => <TimeAgo date={params.row.date.toDate()} />,
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
              onClick={
                () => handleEdit(params.row)
                // navigate(`/adm/transactions/edit/${params.row.uid}`)
              }
              className=" text-white px-4 py-2  outline-none border-none rounded-full bg-green-400"
            >
              Edit
            </button>
            <Icons.BsTrash
              onClick={() => handleDelete(params.row)}
              size={24}
              className="cursor-pointer text-red-500 ml-4"
            />
          </>
        );
      },
    },
  ];

  return (
    <>
      <DataGrid
        columns={column}
        rows={transactions}
        checkboxSelection
        pageSize={10}
        autoHeight
        loading={isLoading}
        getRowId={(params) => params.id}
        disableSelectionOnClick
        onRowClick={() => {}}
        className="bg-primary2 border-black text-white"
      ></DataGrid>

      {openEdit && (
        <div className="w-full h-[100vh] z-50  bg-slate-600/0 fixed top-0 right-0 bottom-0 left-0">
          <div className="relative h-screen lg:w-[50%] w-[100%] mx-auto  overflow-y-scroll ">
            <div className="absolute top-[20%] left-[50%] w-[90%]   -traslate-y-[50%] -translate-x-[50%]  ">
              <button
                onClick={() => setOpenEdit(false)}
                className="rounded-lg p-1 text-white border-primary  text-right "
              >
                <Icons.BsX />
              </button>
              <div className=" bg-primary2  px-10  rounded-lg pb-4 ">
                <form onSubmit={handleSubmit}>
                  <h4 className="text-center mb-10 pt-10 font-bold uppercase primary-text">
                    Edit Transaction
                  </h4>
                  <div className="w-full flex justify-between items-center gap-4">
                    <div className="w-full">
                      <label
                        className=" py-4 text-lg text-gray-500"
                        htmlFor="name"
                      >
                        Name
                      </label>
                      <input
                        className="text-gray-100 mt-2 outline-none  h-[45px] w-full bg-transparent pl-2 rounded-lg border border-gray-300"
                        type="text"
                        name="name"
                        id="name"
                        value={editData.name}
                        onChange={handleChange}
                        disabled
                      />
                    </div>
                    <div className="w-full">
                      <label
                        className=" py-4 text-lg text-gray-500"
                        htmlFor="email"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={editData.email}
                        disabled
                        onChange={handleChange}
                        className="text-gray-100 mt-2 outline-none  h-[45px] w-full bg-transparent pl-2 rounded-lg border border-gray-300"
                      />
                    </div>
                  </div>
                  <div className="w-full flex justify-between items-center gap-4">
                    <div className="w-full">
                      <label
                        className=" py-4 text-lg text-gray-500"
                        htmlFor="type"
                      >
                        Type
                      </label>
                      <input
                        className="text-gray-100 mt-2 outline-none  h-[45px] w-full bg-transparent pl-2 rounded-lg border border-gray-300"
                        type="text"
                        name="type"
                        id="type"
                        disabled
                        value={editData.type}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="w-full">
                      <label
                        className=" py-4 text-lg text-gray-500"
                        htmlFor="amount"
                      >
                        Amount
                      </label>
                      <input
                        type="text"
                        name="amount"
                        id="amount"
                        disabled
                        value={editData.amount}
                        onChange={handleChange}
                        className="text-gray-100 mt-2 outline-none  h-[45px] w-full bg-transparent pl-2 rounded-lg border border-gray-300"
                      />
                    </div>
                  </div>
                  <div className="w-full flex justify-between items-center gap-4">
                    <div className="w-full">
                      <label
                        className=" py-4 text-lg text-gray-500"
                        htmlFor="method"
                      >
                        Method
                      </label>
                      <input
                        type="text"
                        name="method"
                        id="method"
                        value={editData.method}
                        onChange={handleChange}
                        disabled
                        className="text-gray-100 mt-2 outline-none  h-[45px] w-full bg-transparent pl-2 rounded-lg border border-gray-300"
                      />
                    </div>
                    <div className="w-full">
                      <label
                        className=" py-4 text-lg text-gray-500"
                        htmlFor="status"
                      >
                        Status
                      </label>
                      <select
                        type="text"
                        name="status"
                        id="status"
                        value={editData.status}
                        onChange={handleChange}
                        className="[&_option]:bg-neutral-800 text-gray-100 mt-2 outline-none  h-[45px] w-full bg-transparent pl-2 rounded-lg border border-gray-300"
                      >
                        <option value="success">Success</option>
                        <option value="pending">Pending</option>
                        <option value="failed">Failed</option>
                      </select>
                    </div>
                  </div>
                  <div className="mt-6 ">
                    <button type="submit" className="btn-primary ">
                      update
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
