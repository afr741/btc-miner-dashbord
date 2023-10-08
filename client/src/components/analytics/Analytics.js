import React, { Fragment, useState } from 'react';
// import {
//   Container,
//   Grid,
//   GridItem,
//   Flex,
//   Box,
//   Text,
//   Heading,
//   Table,
//   Thead,
//   Tbody,
//   Tfoot,
//   Tr,
//   Th,
//   Td,
//   TableCaption,
//   TableContainer,
// } from '@chakra-ui/react';

import HashrateAnalysisChart from './HashrateAnalysisChart';
import BitcoinEarningsChart from './BitcoinEarningsChart';
import YieldAnalysisChart from './YieldAnalysisChart';
// During a 10 day period how many hashes does an Antminer S1 expect to complete?
// We would expect to mine 7 bitcoin every 10 ExaHash. How many bitcoin does an Antminer S1 expect to win over 10 days?
// Our Antminer S1 really won 1 bitcoin over a 10 day period. What percent of expected yield did it achieve? What would we expect the miners average hashrate to have been over the period?
const blockRewardBTC = 6.25;
function Analytics() {
  const [hashrate, setHashrate] = useState(95.47337585632621);
  const [numberOfDays, setNumberOfDays] = useState(10);
  const [miningDifficulty, setMiningDifficulty] = useState(5.73215);

  // useEffect(() => {}, []);
  return (
    <div>
      <HashrateAnalysisChart hashrate={hashrate} numberOfDays={numberOfDays} />

      <BitcoinEarningsChart
        hashrate={hashrate}
        miningDifficulty={miningDifficulty}
        numberOfDays={numberOfDays}
        blockRewardBTC={blockRewardBTC}
      />
      <YieldAnalysisChart
        achievedYield={1}
        expectedYield={7}
        blockRewardBTC={blockRewardBTC}
        miningDifficulty={miningDifficulty}
        numberOfDays={numberOfDays}
      />
    </div>
  );
}

export default Analytics;
