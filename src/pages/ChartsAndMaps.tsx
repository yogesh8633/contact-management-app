import React, { useLayoutEffect, useRef } from 'react';
import { Spin, Alert, Card, Typography, Statistic, Row, Col } from 'antd';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useGlobalData } from '../hooks/useGlobalData';
import { useCountriesData } from '../hooks/useCountriesData';
import { useHistoricalData } from '../hooks/useHistoricalData';

import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import markerRetina from 'leaflet/dist/images/marker-icon-2x.png';

// Override default Leaflet icon settings
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerRetina,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Apply the animated theme to amCharts
am4core.useTheme(am4themes_animated);

const { Title } = Typography;

const ChartsAndMaps: React.FC = () => {
  const chartRef = useRef<any>(null);

  // Fetch data using custom hooks
  const { data: globalData, isLoading: isLoadingGlobal, error: globalError } = useGlobalData();
  const { data: countriesData, isLoading: isLoadingCountries, error: countriesError } = useCountriesData();
  const { data: historicalData, isLoading: isLoadingHistorical, error: historicalError } = useHistoricalData();

  // Set up the chart using useLayoutEffect
  useLayoutEffect(() => {
    if (historicalData && document.getElementById('chartdiv')) {
      const chart = am4core.create('chartdiv', am4charts.XYChart);

      const dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.renderer.minGridDistance = 50;

      const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.title.text = "Number of Cases"; // Set title for Y-axis
      valueAxis.min = 0; // Ensure Y-axis starts at 0
      valueAxis.renderer.labels.template.fill = am4core.color("#333"); // Color for Y-axis labels

      const createSeries = (field: string, name: string, color: string) => {
        const series = chart.series.push(new am4charts.LineSeries());
        series.dataFields.valueY = field;
        series.dataFields.dateX = 'date';
        series.name = name;
        series.strokeWidth = 3;
        series.minBulletDistance = 15;
        series.tooltipText = `{name}: [bold]{valueY}[/]`;
        series.stroke = am4core.color(color);
        series.tooltip.pointerOrientation = 'vertical';
      };

      // Create series for cases, deaths, and recovered data
      createSeries('cases', 'Cases', '#00b894'); // Teal
      createSeries('deaths', 'Deaths', '#d63031'); // Red
      createSeries('recovered', 'Recovered', '#0984e3'); // Blue

      chart.cursor = new am4charts.XYCursor();
      chart.cursor.xAxis = dateAxis;

      chart.scrollbarX = new am4core.Scrollbar();

      // Prepare chart data from historical data
      const chartData = Object.keys(historicalData.cases).map((date) => ({
        date: new Date(date),
        cases: historicalData.cases[date],
        deaths: historicalData.deaths[date],
        recovered: historicalData.recovered[date],
      }));
      chart.data = chartData;

      chartRef.current = chart;

      return () => {
        chart.dispose();
      };
    }
  }, [historicalData]);

  // Handle loading and error states
  if (isLoadingGlobal || isLoadingCountries || isLoadingHistorical) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <Spin tip="Loading data..." />
      </div>
    );
  }

  if (globalError || countriesError || historicalError) {
    return (
      <div className="m-4">
        <Alert
          message="Error"
          description="Failed to load data. Please try again later."
          type="error"
          showIcon
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
      <Title level={2} className="text-center mb-8 text-indigo-700">
        COVID-19 Global Dashboard
      </Title>

      {/* Global Data Summary */}
      <Row gutter={16} className="mb-6">
        <Col span={8}>
          <Card className="shadow-lg bg-white border-l-4 border-teal-400">
            <Statistic 
              title="Total Cases" 
              value={globalData?.cases.toLocaleString()} 
              valueStyle={{ color: '#00b894' }} 
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card className="shadow-lg bg-white border-l-4 border-blue-400">
            <Statistic 
              title="Total Recovered" 
              value={globalData?.recovered.toLocaleString()} 
              valueStyle={{ color: '#0984e3' }} 
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card className="shadow-lg bg-white border-l-4 border-red-400">
            <Statistic 
              title="Total Deaths" 
              value={globalData?.deaths.toLocaleString()} 
              valueStyle={{ color: '#d63031' }} 
            />
          </Card>
        </Col>
      </Row>
      
      <div className="grid grid-cols-1 gap-6">
        {/* Chart Container */}
        <Card
          title="COVID-19 Cases Over Time"
          className="shadow-lg rounded-lg overflow-hidden bg-white"
          bodyStyle={{ padding: 0 }}
        >
          <div id="chartdiv" className="w-full h-96" />
        </Card>

        {/* Map Container */}
        <Card
          title="Global COVID-19 Map"
          className="shadow-lg rounded-lg overflow-hidden bg-white"
          bodyStyle={{ padding: 0 }}
        >
          <MapContainer
            center={[20, 0]}
            zoom={2}
            className="w-full h-96"
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {countriesData?.map((country: any) => (
              <Marker
                key={country.countryInfo._id}
                position={[country.countryInfo.lat, country.countryInfo.long]}
              >
                <Popup>
                  <strong>{country.country}</strong>
                  <br />
                  Cases: {country.cases.toLocaleString()}
                  <br />
                  Recovered: {country.recovered.toLocaleString()}
                  <br />
                  Deaths: {country.deaths.toLocaleString()}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </Card>
      </div>
    </div>
  );
};

export default ChartsAndMaps;
