import React from "react";
import Footer from "../components/Footer";
import Pagination from "../components/Pagination";
import Sidebar from "../components/Sidebar";
import AdminNav from "../components/AdminNav";

import useCollection from "../../components/hooks/UseCollection";
import Charts from "../components/Charts";
import InfoWidget from "../components/InfoWidget";
import useCollectionGroup from "../../components/hooks/UseCollectionGroup";

const Analytics = () => {
  const [users, loading, err] = useCollection("users");
  const [transactions, isLoading, isError] =
    useCollectionGroup("transactionDatas");
  const data = users?.map((each) => {
    return { name: each.name, amount: each.initialDeposit };
  });

  const getUserData = () => {
    const initialDeposits = users?.reduce(
      (acc, { initialDeposit }) => acc + Number(initialDeposit),
      0
    );
    const totalBalances = users?.reduce(
      (acc, { totalBalance }) => acc + Number(totalBalance),
      0
    );
    const totalProfits = users?.reduce(
      (acc, { profit }) => acc + Number(profit),
      0
    );
    const bonuses = users?.reduce((acc, { bonus }) => acc + Number(bonus), 0);
    return { initialDeposits, totalBalances, bonuses, totalProfits };
  };
 
  return (
    <>
      <AdminNav />
      <div className="flex">
        <Sidebar />
        <div className="flex-[4] h-screen ">
          <section className="w-[90%]  mx-auto ">
            <Pagination title="Analytics" />
            <Charts transactions={transactions} user />
            <InfoWidget
              user={getUserData()}
              transactions={transactions}
              length={users.length}
            />
          </section>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Analytics;
