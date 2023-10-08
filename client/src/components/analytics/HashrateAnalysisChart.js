import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

function HashrateAnalysisChart({ hashrate, numberOfDays }) {
  // Calculate the expected number of hashes completed for each day
  const expectedHashesPerDay = Array.from({ length: numberOfDays }, (_, i) => {
    const day = i + 1;
    const expectedHashes = hashrate * day * 24 * 3600 * Math.pow(10, 12);
    return expectedHashes;
  });

  // Data for the chart
  const data = {
    labels: Array.from({ length: numberOfDays }, (_, i) => `Day ${i + 1}`),
    datasets: [
      {
        label: 'Expected Hashes',
        data: expectedHashesPerDay,
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
        fill: false,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Hashes',
        },
      },
    },
  };

  return (
    <Box p={4} borderWidth="1px" borderRadius="lg">
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        During a {numberOfDays} day period, how many hashes does an Antminer S1
        expect to complete at {hashrate} TH/s hashrate?
      </Text>
      <Line data={data} options={options} />
    </Box>
  );
}

export default HashrateAnalysisChart;
