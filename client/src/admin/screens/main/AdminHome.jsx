import React, { Suspense } from "react";
import Sidebar from "../../components/Sidebar";
import AnalyticsCard from "../../components/AnalyticsCard";
import UserWidget from "../../components/UserWidget";
import Pagination from "../../components/Pagination";
import Charts from "../../components/Charts";
import TransactionWidget from "../../components/TransactionWidget";
import InfoWidget from "../../components/InfoWidget";
import Footer from "../../components/Footer";
import useGetDocument from "../../../components/hooks/UseDocument";
import useCollectionGroup from "../../../components/hooks/UseCollectionGroup";
import { auth } from "../../../database/firebaseDb";
import Toast from "../../../components/Alert";
import converter from "../../../utils/converter";
import AdminNav from "../../components/AdminNav";

function Dashboard() {
  const [user, loading, error] = useGetDocument("users", auth.currentUser.uid, {
    snap: true,
  });
  const [transactions, isLoading, isError] =
    useCollectionGroup("transactionDatas");

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

  return (
    <Suspense fallback={loading && Toast.modal()}>
      <AdminNav />
      <div className="flex">
        <Sidebar />
        <div className="flex-[4]  ">
          <section className="w-[90%]  mx-auto">
            <Pagination title={"Dashboard"} />

            <div className="flex lg:gap-8 gap-4  flex-col lg:flex-row">
              <AnalyticsCard
                title="Total Users"
                info={
                  user.initialDeposit
                    ? converter(Number(user?.initialDeposit))
                    : converter(Number("000"))
                }
                arrow={initialDCheck() >= 50 ? "up" : "fail"}
                success={initialDCheck() >= 50 ? true : false}
                icon="s"
              />
              <AnalyticsCard
                title="Deposites"
                info={
                  user.totalBalance
                    ? converter(Number(user?.totalBalance))
                    : converter(Number("000"))
                }
                arrow={totalDCheck() >= 50 ? "up" : "fail"}
                success={totalDCheck() >= 50 ? true : false}
                icon="u"
              />
              <AnalyticsCard
                title="Transactions"
                info={
                  user.bonus
                    ? converter(Number(user?.bonus))
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
              <InfoWidget user={{}} transactions={[]} />
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
