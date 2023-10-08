import React, { Fragment, useEffect, useState } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import EditWorkerModal from './EditWorkerModal';
import AddWorkerModal from './AddWorkerModal';
import configs from '../../configs/configs';
import { motion, AnimatePresence } from 'framer-motion';

const ListWorkers = () => {
  const [minersData, setminersData] = useState([]);
  const [isEditClicked, setIsEditClicked] = useState(false);
  const [isAddClicked, setIsAddClicked] = useState(false);
  const [currentWorker, setCurrentWorker] = useState(null);

  const MotionTr = motion(Tr);
  //delete workers
  const deleteWorker = async id => {
    setminersData(prevMinersData =>
      prevMinersData.filter(miner => miner.id !== id)
    );
    await fetch(`${configs.serverURL}/miner/${id}`, {
      method: 'DELETE',
    })
      .then(() => console.log('Worker deleted from db'))
      .catch(err => console.error(err));
  };

  //get workers
  const getWorkers = async () => {
    try {
      const response = await fetch(`${configs.serverURL}/miners`);
      const jsonData = await response.json();
      setminersData(jsonData);
      // console.log(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleEditButtonClicked = id => {
    setIsEditClicked(true);
    let currentEditedWorker = minersData.filter(miner => miner.id === id);
    setCurrentWorker(currentEditedWorker);
  };

  useEffect(() => {
    getWorkers();
  }, []);

  return (
    <Fragment>
      <Button m={5} colorScheme="green" onClick={() => setIsAddClicked(true)}>
        Add Worker
      </Button>
      <TableContainer>
        <Table variant="simple">
          <TableCaption>Workers' list</TableCaption>
          <Thead>
            <Tr>
              <Th>id</Th>
              <Th>name</Th>
              <Th>location</Th>
              <Th>hashRate</Th>
              <Th>Edit</Th>
              <Th>Delete</Th>
            </Tr>
          </Thead>
          <Tbody>
            <AnimatePresence>
              {minersData.map((miner, index) => (
                <MotionTr
                  key={miner.id}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                >
                  <Td>{index + 1}</Td>
                  <Td>{miner.name}</Td>
                  <Td>{miner.location}</Td>
                  <Td>{miner.hashrate}</Td>

                  <Td>
                    <Button
                      colorScheme="yellow"
                      onClick={() => {
                        handleEditButtonClicked(miner.id);
                      }}
                    >
                      Edit
                    </Button>
                  </Td>
                  <Td>
                    <Button
                      colorScheme="red"
                      onClick={() => deleteWorker(miner.id)}
                    >
                      Delete
                    </Button>
                  </Td>
                </MotionTr>
              ))}
            </AnimatePresence>
          </Tbody>
        </Table>
      </TableContainer>
      {isEditClicked && (
        <EditWorkerModal
          isOpen={isEditClicked}
          onClose={() => setIsEditClicked(false)}
          currentWorker={currentWorker}
          onAdd={() => getWorkers()}
        />
      )}
      <AddWorkerModal
        isOpen={isAddClicked}
        onClose={() => setIsAddClicked(false)}
        onAdd={() => getWorkers()}
        minersData={minersData}
      />
    </Fragment>
  );
};

export default ListWorkers;
