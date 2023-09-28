import 'chart.js/auto';
import React, { useEffect, useState } from 'react';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { sendRequest } from "../../config/request";

const AnalyticsPage = () => {
  const [analyticsData, setAnalyticsData] = useState(null);

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        const response = await sendRequest({ method: "GET", route: "/analytics" });
        if (response) {
          setAnalyticsData(response);
        }
      } catch (error) {
        console.error('Error fetching analytics data:', error);
      }
    };

    fetchAnalyticsData();
  }, []);

  if (!analyticsData) {
    return <div>...</div>;
  }

  const pieChartData = {
    labels: ['Users', 'Authors'],
    datasets: [
      {
        data: [analyticsData.usersCount, analyticsData.authorsCount],
        backgroundColor: ['#8DB78F', '#587259'],
      },
    ],
  };
  
  const barChartData = {
    labels: analyticsData.propertyCountsByCity.map((data) => data.city_name),
    datasets: [
      {
        label: 'Property Count',
        data: analyticsData.propertyCountsByCity.map((data) => data.count),
        backgroundColor: '#33AFFF',
      },
    ],
  };

  const lineChartData = {
    labels: analyticsData.meetingCounts.map((data) => data.week),
    datasets: [
      {
        label: 'Meeting Count',
        data: analyticsData.meetingCounts.map((data) => data.count),
        borderColor: '#8DB78F',
        fill: false,
      },
    ],
  };

  const usersCountByWeekData = {
    labels: analyticsData.usersCounts.map((data) => data.week),
    datasets: [
      {
        label: 'Users Count',
        data: analyticsData.usersCounts.map((data) => data.count),
        borderColor: '#33AFFF',
        fill: false,
      },
    ],
  };

  const landAvgPricesData = {
    labels: analyticsData.landAvgPrices.map((data) => data.city_name),
    datasets: [
      {
        label: 'Land Avg Price',
        data: analyticsData.landAvgPrices.map((data) => data.avg_price_per_100m2),
        backgroundColor: '#587259',
      },
    ],
  };
 
  const homeAvgPricesData = {
    labels: analyticsData.homeAvgPrices.map((data) => data.city_name),
    datasets: [
      {
        label: 'Home Avg Price',
        data: analyticsData.homeAvgPrices.map((data) => data.avg_price_per_100m2),
        backgroundColor: '#8DB78F',
      },
    ],
  };

  const propertyCountsByCityData = analyticsData.propertyCountsByCity.map((data) => ({
    label: data.city_name,
    value: data.count,
  }));

  const pieChartData2 = {
    labels: propertyCountsByCityData.map((data) => data.label),
    datasets: [
      {
        data: propertyCountsByCityData.map((data) => data.value),
        backgroundColor: ['#8DB78F','#66CDAA', '#33FF57', '#48D1CC', '#2E8B57', '#6B8E23', '#3CB371', '#98FB98'],
      },
    ],
  };

  return (
    <div className="p-4">
      <div className=''>
        <h2 className="text-3xl text-gray-800 font-medium leading-9">Analytics and Statistics </h2>
        <div className="w-36 h-1.5 bg-gradient-to-r from-primary to-black mt-3"></div>
      </div>
      <div className="mb-20 mt-12 w-full max-w-2xl">
        <h2 className="text-xl font-bold text-secondary mb-2">Properties by City:</h2>
        <Bar data={barChartData} />
      </div>
      <div className='flex w-full'>
        <div className="mb-6 flex-1 max-w-[26em]">
          <h2 className="text-xl font-bold text-secondary mb-5">User Types:</h2>
          <Pie data={pieChartData} />
        </div>
        <div className="mb-20 flex-1 max-w-[26em]">
          <h2 className="text-xl font-bold text-secondary mb-5 ">Number of Properties in Cities:</h2>
          <Pie data={pieChartData2} />
        </div>
      </div>
      <div className="mb-20 w-full max-w-2xl">
        <h2 className="text-xl font-bold text-secondary mb-2">Meetings Booked: <span className='text-sm text-primary'>per week</span></h2>
        <Line data={lineChartData} />
      </div>
      <div className="mb-20 w-full max-w-2xl">
        <h2 className="text-xl font-bold text-secondary mb-2">Users Registirations: <span className='text-sm text-primary'>per week</span></h2>
        <Line data={usersCountByWeekData} />
      </div>
      <div className="mb-20 w-full max-w-2xl">
        <h2 className="text-xl font-bold text-secondary mb-2">Land Average Prices: <span className='text-sm text-primary'>per 100m2</span></h2>
        <Bar data={landAvgPricesData} />
      </div>
      <div className="mb-20 w-full max-w-2xl">
        <h2 className="text-xl font-bold text-secondary">Home Average Prices: <span className='text-sm text-primary'>per 100m2</span></h2>
        <Bar data={homeAvgPricesData} />
      </div>
    </div>
  );
};

export default AnalyticsPage;

