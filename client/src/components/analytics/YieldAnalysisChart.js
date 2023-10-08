import React from 'react';
import { Box, Text, SimpleGrid } from '@chakra-ui/react';
import { Bar, Line } from 'react-chartjs-2';

function YieldAnalysisChart({
  achievedYield,
  expectedYield,
  blockRewardBTC,
  miningDifficulty,
  numberOfDays,
}) {
  // Calculate the percentage of achieved yield
  const percentageAchieved = (achievedYield / expectedYield) * 100;

  // Data for the bar chart
  const yieldData = {
    labels: ['Achieved Yield', 'Expected Yield'],
    datasets: [
      {
        label: 'Yield',
        data: [achievedYield, expectedYield],
        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
        borderWidth: 1,
      },
    ],
  };
  const totalHashesRequired =
    (achievedYield / blockRewardBTC) * miningDifficulty;

  const averageHashrateTHs = totalHashesRequired / (numberOfDays * 86400);

  // Data for the line chart
  const hashrateData = {
    labels: Array.from({ length: 10 }, (_, i) => `Day ${i + 1}`),
    datasets: [
      {
        label: 'Expected Average Hashrate',
        data: new Array(10).fill(averageHashrateTHs),
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
          text: 'Hashrate',
        },
      },
    },
  };

  return (
    <Box p={4} borderWidth="1px" borderRadius="lg">
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        Yield Analysis : Our Antminer S1 really won 1 bitcoin over a 10 day
        period. What percent of expected yield did it achieve? What would we
        expect the miners average hashrate to have been over the period?
      </Text>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 5, lg: 8 }}>
        <div style={{ flex: 1 }}>
          <Bar data={yieldData} options={{ maintainAspectRatio: false }} />
        </div>
        <div style={{ flex: 1 }}>
          <Line data={hashrateData} options={options} />
        </div>
      </SimpleGrid>
      <Text fontSize="lg" mt={4}>
        Achieved Yield as a Percentage of Expected Yield:
        {percentageAchieved.toFixed(2)}%
      </Text>
    </Box>
  );
}

export default YieldAnalysisChart;
