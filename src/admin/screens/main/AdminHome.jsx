import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import AnalyticsCard from "../../components/AnalyticsCard";
import UserWidget from "../../components/UserWidget";
import Pagination from "../../components/Pagination";
import Charts from "../../components/Charts";
import TransactionWidget from "../../components/TransactionWidget";
import InfoWidget from "../../components/InfoWidget";
import Footer from "../../components/Footer";
import useCollectionGroup from "../../../components/hooks/UseCollectionGroup";
import { auth, db } from "../../../database/firebaseDb";
import Toast from "../../../components/Alert";
import converter from "../../../utils/converter";
import AdminNav from "../../components/AdminNav"
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, getDocs, query, where } from "firebase/firestore";

function Dashboard() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const getUsers = async () => {
      const use = await getDocs(
        query(collection(db, "users"), where("isAdmin", "!=", true))
      );
      const info = use.docs.map((each) => each.data());
      setUsers(info);
    };
    getUsers();
  }, []);

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
    <>
      <AdminNav />
      <div className="flex">
        <Sidebar />
        <div className="flex-[4]  overflow-x-hidden">
          <section className="w-[90%]  mx-auto">
            <Pagination title={"Dashboard"} />

            <div className="flex lg:gap-8 gap-4  flex-col lg:flex-row">
              <AnalyticsCard
                title="Total Users"
                info={users.length}
                arrow={initialDCheck() >= 50 ? "up" : "fail"}
                success={initialDCheck() >= 50 ? true : false}
                icon="s"
              />
              <AnalyticsCard
                title="Deposites"
                info={
                  getUserData().initialDeposits
                    ? converter(Number(getUserData()?.initialDeposits))
                    : converter(Number("000"))
                }
                arrow={totalDCheck() >= 50 ? "up" : "fail"}
                success={totalDCheck() >= 50 ? true : false}
                icon="u"
              />
              <AnalyticsCard
                title="Bonus Payout"
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
              <UserWidget users={users} />
              <InfoWidget
                user={getUserData()}
                transactions={transactions}
                length={users.length}
              />
            </div>
            <TransactionWidget transactions={transactions} />
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Dashboard;
