import React, { useEffect, useRef } from 'react';
import { Chart } from 'react-google-charts';

const GoogleChart = () => {
  const isMounted = useRef(true);
  const chartContainerRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    const loadGoogleCharts = async () => {
      try {
        // Load the Google Charts API dynamically
        await new Promise((resolve, reject) => {
          const script = document.createElement('script');
          script.type = 'text/javascript';
          script.src = 'https://www.gstatic.com/charts/loader.js';
          script.onload = () => {
            // Once the API is loaded, initialize it
            window.google.charts.load('current', { packages: ['corechart'] });
            window.google.charts.setOnLoadCallback(drawStuff);
          };
          script.onerror = reject;
          document.head.appendChild(script);
        });
      } catch (error) {
        console.error('Error loading Google Charts API:', error);
      }
    };

    const drawStuff = () => {
      if (!window.google || !window.google.visualization || !chartContainerRef.current || !isMounted.current) {
        return;
      }

      const data = new window.google.visualization.DataTable();
      data.addColumn('string', 'Country');
      data.addColumn('number', 'GDP');
      data.addRows([
        ['1', 7000.00],
        ['2', 10990.00],
        ['3', 4998.00],
      ]);

      const options = {
        width: 500,
        height: 350,
        legend: 'none',
        backgroundColor: 'transparent',
        colors: ['limegreen', '#52FF00'],
        bar: { groupWidth: '35%' },
        baselineColor: '#fff',
        gridlineColor: '#000',
        vAxis: { gridlines: { count: 1 }, textStyle: { color: '#FFF' } },
        hAxis: { textStyle: { color: '#FFF' } },
      };

      chartInstanceRef.current = new window.google.visualization.ColumnChart(chartContainerRef.current);
      chartInstanceRef.current.draw(data, options);
    };

    loadGoogleCharts();
    drawStuff();

    // Handle window resize
    const handleResize = () => {
      drawStuff();
    };

    window.addEventListener('resize', handleResize);

    // Cleanup the event listener and the chart instance
    return () => {
      isMounted.current = false;
      window.removeEventListener('resize', handleResize);

      const currentChartContainer = chartContainerRef.current;
      if (chartInstanceRef.current && currentChartContainer && currentChartContainer.parentNode) {
        chartInstanceRef.current.clearChart();
        currentChartContainer.parentNode.removeChild(currentChartContainer);
      }
    };
  }, []); // empty dependency array ensures this useEffect runs once on component mount

  return (
    <div id="number_format_chart" ref={chartContainerRef}>
      <Chart
        width={'500px'}
        height={'350px'}
        chartType="ColumnChart"
        loader={<div>Loading Chart</div>}
        data={[
          ['Country', 'GDP'],
          ['1', 7000.00],
          ['2', 10990.00],
          ['3', 4998.00],
        ]}
        options={{
          legend: 'none',
          backgroundColor: 'transparent',
          colors: ['limegreen', '#52FF00'],
          bar: { groupWidth: '35%' },
          baselineColor: '#fff',
          gridlineColor: '#000',
          vAxis: { gridlines: { count: 1 }, textStyle: { color: '#FFF' } },
          hAxis: { textStyle: { color: '#FFF' } },
        }}
      />
    </div>
  );
};

export default GoogleChart;
