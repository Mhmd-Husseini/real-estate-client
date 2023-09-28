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
    <div className="md:mx-auto max-w-screen-xl my-8 mx-5">
      <div className='flex flex-col justify-between items-start max-w-3xl mt-8'>
        <h1 className='font-bold text-3xl mb-2 text-gray-800'>
          Market Trends and Analysis
        </h1>
        <p className='mb-10 text-lg font-medium text-justify leading-8 text-gray-500'>
          Get Insights into the Real Estate Market
        </p>
      </div>
      <div className="max-w-screen-lg mx-auto border-4 border-primary p-8 mb-32">
        <canvas id="myChart" width={400} height={200}></canvas>
      </div>
      <div className="article-list mt-8">
        <ul>
          {data.articles.map((article) => (
            <li className='mb-16' key={article.id}>
              <h1 className='font-bold text-3xl mb-2 text-gray-800'>{article.title}</h1>
              <div className='h-1 w-28 bg-gradient-to-r from-primary to-black mb-6'></div>
              <p className='font-medium text-2xl text-primary'><strong className='text-gray-800'>by</strong> {article.author.name}</p>
              <p className="text-md text-gray-500 mb-4"> {new Date(article.created_at).toLocaleDateString("en-US", {year: "numeric", month: "long", day: "numeric"})}</p>
              <p className="text-justify text-lg text-gray-700 mb-20 font-medium leading-9">{article.content}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );  
};

export default Trends;
