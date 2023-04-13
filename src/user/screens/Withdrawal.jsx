import React, { useState } from "react";
import useGetDocument from "../../components/hooks/UseDocument";
import { auth } from "../../database/firebaseDb";
import Footer from "../components/Footer";
import Pagination from "../components/Pagination";
import Sidebar from "../components/Sidebar";
import UserNav from "../components/UserNav";
import WithdrawalDropdown from "../components/WithdrawalDropdown";

function Withdrawal() {
  const [user, loading, error] = useGetDocument("users", auth.currentUser.uid, {
    snap: true,
  });
  const [bankMethod, setBankMethod] = useState({
    open: false,
    accountNumber: "",
    accountName: "",
    bankName: "",
    amount: "",
    method: "",
    status: "pending",
    loading: false,
  });
  const [bitcoinMethod, setBitcoinMethod] = useState({
    open: false,
    walletAddress: "",
    name: "",
    email: "",
    amount: "",
    method: "",
    status: "pending",
    loading: false,
  });
  const [litecoinMethod, setLitecoinMethod] = useState({
    open: false,
    walletAddress: "",
    name: "",
    email: "",
    amount: "",
    method: "",
    status: "pending",
    loading: false,
  });
  const [etheriumMethod, setEtheriumMethod] = useState({
    open: false,
    walletAddress: "",
    name: "",
    email: "",
    amount: "",
    method: "",
    status: "pending",
    loading: false,
  });

  return (
    <>
      <UserNav />
      <div className="flex">
        <Sidebar />
        <div className="flex-[4]">
          <section className="w-[90%] mx-auto">
            <Pagination title="Withdrawal" />
            <div className=" w-full">
              <div className="flex justify-center items-center">
                <div className="bg-primary2 px-4 pt-6  pb-14 rounded-lg w-full  mx-auto ">
                  <div className=" ">
                    <h5 className="text-2xl  text-center primary-text font-[500] font-ubuntu  py-8">
                      Choose Your Withdrawal Method
                    </h5>

                    <div className="flex flex-col gap-6">
                      <div>
                        <button
                          onClick={() => {
                            setBankMethod({
                              ...bankMethod,
                              open: !bankMethod.open,
                              method: "Bank",
                            });
                          }}
                          className="btn-primary disabled:bg-gray-300 w-full"
                        >
                          Bank
                        </button>
                        <WithdrawalDropdown
                          method="bank"
                          withdrawalBank={bankMethod}
                          setWithdrawalBank={setBankMethod}
                          user={user}
                        />
                      </div>
                      <div>
                        <button
                          onClick={() => {
                            setBitcoinMethod({
                              ...bitcoinMethod,
                              open: !bitcoinMethod.open,
                              method: "Bitcoin",
                            });
                          }}
                          className="btn-primary disabled:bg-gray-300 w-full"
                        >
                          Bitcoin
                        </button>
                        <WithdrawalDropdown
                          user={user}
                          method=""
                          withdrawalInfo={bitcoinMethod}
                          setWithdrawalInfo={setBitcoinMethod}
                        />
                      </div>
                      <div>
                        <button
                          onClick={() => {
                            setEtheriumMethod({
                              ...etheriumMethod,
                              open: !etheriumMethod.open,
                              method: "Ethereum",
                            });
                          }}
                          className="btn-primary disabled:bg-gray-300 w-full"
                        >
                          Ethereum
                        </button>
                        <WithdrawalDropdown
                          method=""
                          withdrawalInfo={etheriumMethod}
                          setWithdrawalInfo={setEtheriumMethod}
                          user={user}
                        />
                      </div>
                      <div>
                        <button
                          onClick={() => {
                            setLitecoinMethod({
                              ...litecoinMethod,
                              open: !litecoinMethod.open,
                              method: "Litcoin",
                            });
                          }}
                          className="btn-primary disabled:bg-gray-300 w-full"
                        >
                          Litecoin
                        </button>
                        <WithdrawalDropdown
                          method=""
                          withdrawalInfo={litecoinMethod}
                          setWithdrawalInfo={setLitecoinMethod}
                          user={user}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Withdrawal;
