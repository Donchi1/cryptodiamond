import React, { Suspense } from "react";
import Sidebar from "../../components/Sidebar";
import AnalyticsCard from "../../components/AnalyticsCard";
import UserWidget from "../../components/UserWidget";
import Pagination from "../../components/Pagination";
import Charts from "../../components/Charts";
import TransactionWidget from "../../components/TransactionWidget";
import InfoWidget from "../../components/InfoWidget";
import Footer from "../../components/Footer";
import useCollectionGroup from "../../../components/hooks/UseCollectionGroup";
import { auth } from "../../../database/firebaseDb";
import Toast from "../../../components/Alert";
import converter from "../../../utils/converter";
import AdminNav from "../../components/AdminNav";
import useCollection from "../../../components/hooks/UseCollection";

function Dashboard() {
  const [users, loading, error] = useCollection("users", auth.currentUser.uid, {
    snap: true,
  });
  const [transactions, isLoading, isError] =
    useCollectionGroup("transactionDatas");

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

  const initialDCheck = () => {
    const initialNumber = Number(getUserData()?.initialDeposits);
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
    const initialNumber = Number(getUserData()?.totalBalances);
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
    const initialNumber = Number(getUserData()?.bonuses);
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

  return (
    <Suspense fallback={loading && Toast.modal()}>
      <AdminNav />
      <div className="flex">
        <Sidebar />
        <div className="flex-[4]  overflow-x-hidden">
          <section className="w-[90%]  mx-auto">
            <Pagination title={"Dashboard"} />

            <div className="flex lg:gap-8 gap-4  flex-col lg:flex-row">
              <AnalyticsCard
                title="Total Users"
                info={
                  getUserData()?.initialDeposits
                    ? converter(Number(getUserData()?.initialDeposits))
                    : converter(Number("000"))
                }
                arrow={initialDCheck() >= 50 ? "up" : "fail"}
                success={initialDCheck() >= 50 ? true : false}
                icon="s"
              />
              <AnalyticsCard
                title="Deposites"
                info={
                  getUserData().totalBalances
                    ? converter(Number(getUserData()?.totalBalances))
                    : converter(Number("000"))
                }
                arrow={totalDCheck() >= 50 ? "up" : "fail"}
                success={totalDCheck() >= 50 ? true : false}
                icon="u"
              />
              <AnalyticsCard
                title="Transactions"
                info={
                  getUserData()?.bonuses
                    ? converter(Number(getUserData()?.bonuses))
                    : converter(Number("000"))
                }
                arrow={bonusDCheck() >= 50 ? "up" : "fail"}
                success={bonusDCheck() >= 50 ? true : false}
                icon="t"
              />
            </div>
            <Charts transactions={transactions} />
            <div className="flex gap-4 flex-col lg:flex-row ">
              <UserWidget />
              <InfoWidget user={getUserData()} transactions={transactions} />
            </div>
            <TransactionWidget transactions={transactions} />
          </section>
        </div>
      </div>
      <Footer />
    </Suspense>
  );
}

export default Dashboard;
