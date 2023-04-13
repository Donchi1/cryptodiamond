import React, { useEffect } from "react";
import UserNav from "../components/UserNav";
import Sidebar from "../components/Sidebar";
import AnalyticsCard from "../components/AnalyticsCard";
import Pagination from "../components/Pagination";
import Charts from "../components/Charts";
import TransactionWidget from "../components/TransactionWidget";
import InfoWidget from "../components/InfoWidget";
import Footer from "../components/Footer";
import useGetDocument from "../../components/hooks/UseDocument";
import useGetCollection from "../../components/hooks/UseCollection";
import { auth } from "../../database/firebaseDb";
import converter from "../../utils/converter";
import { Navigate } from "react-router-dom";
import Toast from "../../components/Alert";
import { motion } from "framer-motion";
import logo from "/logo.png";

function Dashboard() {
  const [user, loading, error] = useGetDocument("users", auth.currentUser.uid, {
    snap: true,
  });

  const [transactions, isLoading, isError] = useGetCollection(
    `transactions/${auth.currentUser.uid}/transactionDatas`
  );

  const initialDCheck = () => {
    const initialNumber = Number(user?.initialDeposit);
    if (initialNumber === 200) {
      return 10;
    }
    if (initialNumber <= 500 && initialNumber > 200) {
      return 50;
    }
    if (initialNumber <= 1000 && initialNumber > 500) {
      return 70;
    }
    if (initialNumber >= 1000) {
      return 100;
    }
    return 0;
  };

  const totalDCheck = () => {
    const initialNumber = Number(user?.totalBalance);
    if (initialNumber === 200) {
      return 10;
    }
    if (initialNumber <= 500 && initialNumber > 200) {
      return 50;
    }
    if (initialNumber <= 1000 && initialNumber > 500) {
      return 70;
    }
    if (initialNumber >= 1000) {
      return 100;
    }
    return 0;
  };
  const bonusDCheck = () => {
    const initialNumber = Number(user?.bonus);
    if (initialNumber === 200) {
      return 10;
    }
    if (initialNumber <= 500 && initialNumber > 200) {
      return 50;
    }
    if (initialNumber <= 1000 && initialNumber > 500) {
      return 70;
    }
    if (initialNumber >= 1000) {
      return 100;
    }
    return 0;
  };

  if (loading) {
    return (
      <div className="w-full h-screen ">
        <div className="h-full flex justify-center items-center flex-col ">
          <img src={logo} alt="logo" className="animate-bounce" />
          <motion.p
            animate={{ opacity: 0, translateX: "-150px" }}
            whileInView={{ opacity: 1, translateX: 0 }}
            transition={{ easing: ["linear"], duration: 1.5 }}
            className="text-white text-lg italic"
          >
            Loading...
          </motion.p>
        </div>
      </div>
    );
  }

  if (!user?.verified || user?.verified === "false") {
    return <Navigate to="/account/verify" replace />;
  }
  return (
    <>
      <UserNav />
      <div className="flex ">
        <Sidebar />
        <div className="flex-[4] overflow-x-hidden ">
          <section className="w-[90%]  mx-auto">
            <Pagination title={"Dashboard"} />

            <div className="flex lg:gap-8 gap-4  flex-col lg:flex-row">
              <AnalyticsCard
                title="Deposite"
                info={
                  user?.initialDeposit
                    ? converter(Number(user?.initialDeposit))
                    : converter(Number("000"))
                }
                arrow={initialDCheck() >= 50 ? "up" : "fail"}
                success={initialDCheck() >= 50 ? true : false}
                icon="s"
              />
              <AnalyticsCard
                title="Total"
                info={
                  user?.totalBalance
                    ? converter(Number(user?.totalBalance))
                    : converter(Number("000"))
                }
                arrow={totalDCheck() >= 50 ? "up" : "fail"}
                success={totalDCheck() >= 50 ? true : false}
                icon="u"
              />
              <AnalyticsCard
                title="Bonus"
                info={
                  user?.bonus
                    ? converter(Number(user?.bonus))
                    : converter(Number("000"))
                }
                arrow={bonusDCheck() >= 50 ? "up" : "fail"}
                success={bonusDCheck() >= 50 ? true : false}
                icon="t"
              />
            </div>
            <Charts transactions={transactions} />
            <div className="flex gap-4 flex-col lg:flex-row overflow-x-hidden">
              <InfoWidget transactions={transactions} user={user} />
              <TransactionWidget transactions={transactions} />
            </div>
          </section>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
