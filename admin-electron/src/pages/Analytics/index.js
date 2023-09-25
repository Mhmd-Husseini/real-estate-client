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
    return <div>Loading...</div>;
  }

  const pieChartData = {
    labels: ['Users', 'Authors'],
    datasets: [
      {
        data: [analyticsData.usersCount, analyticsData.authorsCount],
        backgroundColor: ['#FF5733', '#33FF57'],
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
        borderColor: '#FF5733',
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
        backgroundColor: '#FF5733',
      },
    ],
  };

  const homeAvgPricesData = {
    labels: analyticsData.homeAvgPrices.map((data) => data.city_name),
    datasets: [
      {
        label: 'Home Avg Price',
        data: analyticsData.homeAvgPrices.map((data) => data.avg_price_per_100m2),
        backgroundColor: '#33FF57',
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
        backgroundColor: ['#FF5733', '#33FF57', '#3366FF', '#FF33CC', '#33CCFF', '#33FF33', '#FF9933'],
      },
    ],
  };

  return (
    <div className="p-4">

    </div>
  );
};

export default AnalyticsPage;

