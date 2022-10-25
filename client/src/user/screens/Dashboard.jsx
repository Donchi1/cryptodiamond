import React, { Suspense } from "react";
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
import Toast from "../../components/Alert";
import converter from "../../utils/converter";

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

  return (
    <Suspense fallback={Toast.modal()}>
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
    </Suspense>
  );
}

export default Dashboard;
