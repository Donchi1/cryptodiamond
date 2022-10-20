import React from "react";
import * as Icons from "react-icons/Bs";
import converter from "../../utils/converter";

function InfoWidget({ transactions, user }) {
  return (
    <div className="bg-primary2 rounded-lg mt-4  pb-4  px-6 ">
      <div className="">
        <div className="py-4 ">
          <h2 className="text-white  uppercase font-bold text-xl">Life Info</h2>
        </div>

        <ul className="flex flex-col gap-4 text-gray-500 text-md">
          <li className="flex items-center gap-3 text-[1rem]">
            <Icons.BsCurrencyBitcoin className="primary-text text-2xl " />
            <span>Total Deposits: </span>
            <span>
              {user?.initialDeposits
                ? converter(Number(user?.initialDeposits))
                : converter(Number("000"))}
            </span>
          </li>
          <li className="flex items-center gap-3 text-[1rem]">
            <Icons.BsCursor className="primary-text text-2xl " />
            <span> Account Status : </span>
            <span>{user?.status || "Active"} </span>
          </li>
          <li className="flex items-center gap-3 text-[1rem]">
            <Icons.BsCash className="primary-text text-2xl " />
            <span> Total Users : </span>
            <span>
              {user?.bonuses ? converter(user?.bonuses) : converter("000")}
            </span>
          </li>
          <li className="flex items-center gap-3 text-[1rem]">
            <Icons.BsDiamond className="primary-text text-2xl " />
            <span> Transactions :</span>
            <span>{transactions?.length || 0}</span>
          </li>
          <li className="flex items-center gap-3 text-[1rem]">
            <Icons.BsGem className="primary-text text-2xl " />
            <span> Total Profit :</span>
            <span>
              {user?.profits
                ? converter(Number(user?.profit))
                : converter(Number("000"))}
            </span>
          </li>
          <li className="flex items-center gap-3 text-[1rem]">
            <Icons.BsCurrencyExchange className="primary-text text-2xl " />
            <span> Total Payout :</span>
            <span>
              {user?.totalBalance
                ? converter(Number(user?.totalBalance))
                : converter(Number("000"))}
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default InfoWidget;
