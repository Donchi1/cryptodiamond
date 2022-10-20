import React, { Suspense } from "react";
import Footer from "../components/Footer";
import Pagination from "../components/Pagination";
import Sidebar from "../components/Sidebar";
import UserNav from "../components/UserNav";
import { Link } from "react-router-dom";
import useGetCollection from "../../components/hooks/UseCollection";
import { auth } from "../../database/firebaseDb";
import Toast from "../../components/Alert";
import converter from "../../utils/converter";
import TimeAgo from "react-timeago";

function History() {
  const [transactions, loading, isError] = useGetCollection(
    `transactions/${auth.currentUser.uid}/transactionDatas`
  );
  return (
    <Suspense fallback={loading && Toast.modal()}>
      <UserNav />
      <div className="flex">
        <Sidebar />
        <div className="flex-[4]  overflow-x-hidden">
          <section className="w-[90%]  mx-auto h-screen">
            <Pagination title={"History"} />
            <div className="pb-4 shadow-lg mt-4 rounded-lg flex-[3]   dark:bg-gray-800 bg-primary2">
              <div className="py-4 flex justify-between items-center px-6">
                <h1 className="text-white  uppercase font-bold text-xl">
                  Latest Transactions
                </h1>
                <Link to="/user/payment" className="btn-primary">
                  create
                </Link>
              </div>
              <div className="w-full  lg:overflow-x-hidden overflow-x-scroll ">
                <table className="  rounded-lg ">
                  <thead>
                    <tr className=" border-b border-gray-300 border-t mb-2 text-white ">
                      <td className=" p-4" scope="row">
                        Id
                      </td>
                      <td className=" p-4" scope="row">
                        Type
                      </td>
                      <td className=" p-4" scope="row">
                        Date
                      </td>
                      <td className=" p-4" scope="row">
                        Amount
                      </td>

                      <td className=" p-4" scope="row">
                        status
                      </td>
                    </tr>
                  </thead>
                  <tbody className=" pt-4  dark:bg-gray-800 dark:text-white">
                    {transactions?.map((each) => (
                      <tr className="text-gray-500">
                        <td className="  w-14 h-14 pl-3 ">
                          {each.uid.slice(0, 20)}
                        </td>
                        <td className="  w-14 h-14 pl-3 ">{each.type}</td>
                        <td className="  w-14 h-14 pl-3">
                          <TimeAgo date={each.date.toDate()} />
                        </td>
                        <td className="  w-14 h-14 pl-3 ">
                          {converter(Number(each.amount))}
                        </td>
                        <td className="  w-14 h-14 pl-3 ">
                          {each.status === "success" && (
                            <span className="rounded-full border pb-3 bg-green-400 text-white border-green-400 text-center py-2 px-4">
                              success
                            </span>
                          )}
                          {each.status === "pending" && (
                            <span className="rounded-full border pb-3 bg-yellow-400 text-white border-yellow-400 text-center py-2 px-4">
                              Pending
                            </span>
                          )}
                          {each.status === "failed" && (
                            <span className="rounded-full border pb-3 bg-red-400 text-white border-red-400 text-center py-2 px-4">
                              Failed
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}

                    {transactions?.length === 0 && (
                      <tr className="primary-text text-center mt-8 text-lg capitalize">
                        <td>No transaction yet</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </Suspense>
  );
}

export default History;
