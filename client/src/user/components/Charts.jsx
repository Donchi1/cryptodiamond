import React from "react";
import {
  LineChart,
  ResponsiveContainer,
  CartesianGrid,
  Line,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function Charts({ transactions }) {
  const data = [
    { name: "Jan", amt: 400 },
    { name: "Feb", amt: 500 },
    { name: "Mar", amt: 460 },
    { name: "Apr", amt: 90 },
    { name: "May", amt: 100 },
    { name: "Jun", amt: 500 },
    { name: "Jul", amt: 800 },
    { name: "Aug", amt: 700 },
    { name: "Sep", amt: 600 },
    { name: "Oct", amt: 900 },
    { name: "Nov", amt: 400 },
    { name: "Dec", amt: 200 },
  ];
  return (
    <ResponsiveContainer
      width={"100%"}
      height={400}
      className="shadow-lg   rounded-lg mt-4 bg-primary2  pb-4 lg:pb-0"
    >
      <LineChart
        width={150}
        height={50}
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid
          strokeDasharray="5 5"
          strokeOpacity={0.4}
          strokeDashoffset={9}
        />
        <XAxis
          dataKey="name"
          strokeDasharray="5 5"
          tick={{ fill: "#f75616" }}
        />

        <Tooltip />

        <Line type="monotone" dataKey="name" stroke="#f75616" />

        <Line
          type="monotone"
          dataKey="amt"
          stroke="#f75616"
          activeDot={{ r: 12 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
