import React, { useEffect, useState } from 'react';
//components

import {
  Box,
  chakra,
  Flex,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
} from '@chakra-ui/react';
import { FiServer } from 'react-icons/fi';
import { motion } from 'framer-motion';

import configs from '../../configs/configs';

function StatsCard(props) {
  const { title, stat, icon } = props;
  const MotionBox = motion(Box);

  return (
    <MotionBox
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Stat
        px={{ base: 2, md: 4 }}
        py={'5'}
        shadow={'2xl'}
        border={'3px solid'}
        borderColor={useColorModeValue('red.500', 'gray.500')}
        rounded={'lg'}
      >
        <Flex justifyContent={'space-between'}>
          <Box pl={{ base: 2, md: 4 }}>
            <StatLabel fontWeight={'semibold'} isTruncated>
              {title}
            </StatLabel>
            <StatNumber fontSize={'2xl'} fontWeight={'medium'}>
              {stat}
            </StatNumber>
          </Box>
          <Box
            my={'auto'}
            color={useColorModeValue('gray.800', 'gray.200')}
            alignContent={'center'}
          >
            {icon}
          </Box>
        </Flex>
      </Stat>
    </MotionBox>
  );
}

export default function Dashboard() {
  const [miningStats, setMiningStats] = useState([
    { label: 'Total hash rate', value: '--' },
    { label: 'Number of active miners', value: '--' },
    { label: 'Mining difficulty', value: '--' },
    { label: 'Bitcoin price', value: '--' },
    { label: 'Mining revenue', value: '--' },
  ]);

  const getStats = async () => {
    try {
      const response = await fetch(`${configs.serverURL}/stats`);
      const data = await response.json();
      console.log(data);
      setMiningStats(prevStats =>
        prevStats.map(stat => {
          switch (stat.label) {
            case 'Total hash rate':
              return { ...stat, value: data.total_hash_rate };
            case 'Number of active miners':
              return { ...stat, value: data.active_miners };
            case 'Mining difficulty':
              return { ...stat, value: data.miningDifficulty };
            case 'Bitcoin price':
              return { ...stat, value: data.bitcoinPrice };
            case 'Mining revenue':
              return { ...stat, value: data.mining_revenue };
            default:
              return stat;
          }
        })
      );
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    getStats();
  }, []);

  return (
    <Box maxW="7xl" mx={'auto'} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
      <chakra.h1
        textAlign={'center'}
        fontSize={'4xl'}
        py={10}
        fontWeight={'bold'}
      >
        Hello user! Here are the current stats:
      </chakra.h1>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 5, lg: 8 }}>
        {miningStats.map((stat, index) => (
          <StatsCard
            key={`${stat}_${index}`}
            title={stat.label}
            stat={stat.value}
            icon={<FiServer size={'3em'} />}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
}
