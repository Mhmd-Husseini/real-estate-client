import React, { useEffect, useState, useRef } from "react";
import { sendRequest } from "../../config/request";
import Chart from "chart.js/auto";

const Trends = () => {
  const [data, setData] = useState({ transactions: [], articles: [] });
  const chartRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await sendRequest({ method: "GET", route: "guest/trends" });
        setData(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  
  useEffect(() => {
    if (data.transactions.length > 0) {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
      chartRef.current = new Chart("myChart", {type: "line",data: { labels: data.transactions.map((item) => `${item.year}-${item.month}`),
          datasets: [
            {label: "Transactions Value",borderColor: "#007BFF",data: data.transactions.map((item) =>parseFloat(item.transactions_value)),fill: false },
            {label: "Transactions Number",borderColor: "#28A745", data: data.transactions.map((item) => item.transactions_nb),fill: false },
          ],
        },
        options: {
          scales: {
            x: {title: { display: true, text: "Month" } },
            y: { beginAtZero: true, title: {display: true,text: "Value/Number" }},
          },
        },
      });
    }
  }, [data]);

  return (
    <div className="mx-auto max-w-screen-xl my-8">
      <div className='flex flex-col justify-between items-start max-w-3xl mt-8'>
        <h1 className='font-bold text-3xl mb-2 text-gray-800'>
          Market Trends and Analysis
        </h1>
        <p className='mb-10 text-lg font-medium text-justify leading-8 text-gray-500'>
          Get Insights into the Real Estate Market
        </p>
      </div>
      <div className="max-w-screen-lg mx-auto border-4 border-primary p-8">
        <canvas id="myChart" width={400} height={200}></canvas>
      </div>

    </div>
  );  
};

export default Trends;
