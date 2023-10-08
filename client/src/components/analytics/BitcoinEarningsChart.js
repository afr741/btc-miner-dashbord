import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

function BitcoinEarningsChart({
  hashrate,
  miningDifficulty,
  numberOfDays,
  blockRewardBTC,
}) {
  // Calculate Bitcoin earnings for each day
  const bitcoinEarningsPerDay = Array.from({ length: numberOfDays }, (_, i) => {
    const day = i + 1;
    const bitcoinEarnings =
      (hashrate * 24 * 3600 * blockRewardBTC) / miningDifficulty;
    return bitcoinEarnings * day; // Accumulative earnings over days
  });

  // Data for the chart
  const data = {
    labels: Array.from({ length: numberOfDays }, (_, i) => `Day ${i + 1}`),
    datasets: [
      {
        label: 'Bitcoin Earnings (BTC)',
        data: bitcoinEarningsPerDay,
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
          text: 'Bitcoin Earnings (BTC)',
        },
      },
    },
  };

  return (
    <Box p={4} borderWidth="1px" borderRadius="lg">
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        We would expect to mine 7 bitcoin every 10 ExaHash. How many bitcoin
        does an Antminer S1 expect to win over {numberOfDays} days?
      </Text>
      <Line data={data} options={options} />
    </Box>
  );
}

export default BitcoinEarningsChart;
