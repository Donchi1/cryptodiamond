import React, { useEffect } from "react";
import Chart from "chart.js/auto";

export default function Charts({ transactions, user }) {
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
    { name: "Dec", amt: 200 },
  ];
  const dates = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const transForDisplay = user
    ? transactions
    : transactions?.map((each) => {
        return {
          amt: each.amount,
          months: new Date(transactions[0].date.toDate())
            .toDateString()
            .slice(4, 7),
        };
      });

  useEffect(() => {
    var config = {
      type: "line",
      data: {
        labels: dates.map((each) => each),
        datasets: [
          {
            label: new Date().getFullYear(),
            backgroundColor: "#f75616",
            borderColor: "gray",
            data:
              transactions.length > 0
                ? transForDisplay.map((each) => each.amt)
                : data.map((each) => each.amt),
            fill: false,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
          title: {
            text: "transaction Charts",
            color: "white",
          },
          legend: {
            labels: {
              color: "red",
            },
            display: false,
            align: "center",
            position: "top",
          },
          tooltips: {
            mode: "index",
            intersect: false,
          },
          hover: {
            mode: "nearest",
            intersect: true,
          },
          scales: {
            x: {
              ticks: {
                fontColor: "white",
              },
              display: true,
              scaleLabel: {
                display: false,
                labelString: "Month",
                fontColor: "white",
              },
              gridLines: {
                display: false,
                borderDash: [2],
                borderDashOffset: [2],
                color: "rgba(33, 37, 41, 0.3)",
                zeroLineColor: "rgba(0, 0, 0, 0)",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
            y: {
              ticks: {
                fontColor: "white",
              },
              display: true,
              scaleLabel: {
                display: false,
                labelString: "Value",
                fontColor: "white",
              },
              gridLines: {
                borderDash: [3],
                borderDashOffset: [3],
                drawBorder: false,
                color: "rgba(17, 17, 17, 0.15)",
                zeroLineColor: "rgba(33, 37, 41, 0)",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          },
        },
      },
    };
    var ctx = document?.getElementById("line-chart").getContext("2d");
    var myLine = new Chart(ctx, config);

    return () => {
      myLine.destroy();
    };
  }, []);
  return (
    <div className="relative h-96 text-white rounded-lg  dark:bg-gray-800 bg-primary2 mt-8">
      <canvas id="line-chart"></canvas>
    </div>
  );
}
