import React, { Fragment, useEffect, useState } from 'react';
import {
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from '@chakra-ui/react';
import configs from '../../configs/configs';
import { Button } from '@chakra-ui/react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Select,
} from '@chakra-ui/react';

const locationOptions = [
  'Mining Facility A',
  'Mining Facility B',
  'Mining Facility C',
];

const EditWorkerModal = ({
  isOpen,
  onClose = () => {},
  onAdd,
  currentWorker,
}) => {
  const finalRef = React.useRef(null);

  const [minerData, setMinerData] = useState({
    name: '',
    location: '',
    hashrate: '',
  });
  const [isHashrateInvalid, setHashrateInvalid] = useState(false);

  useEffect(() => {
    let hashrate = currentWorker[0].hashrate;
    const floatHashRate = hashrate.split(' ')[0];

    setMinerData({ ...currentWorker[0], hashrate: floatHashRate });
    console.log('cure worker', currentWorker);
  }, []);

  const handleClose = () => {
    onClose();
  };
  const onSubmitForm = async e => {
    e.preventDefault();

    const { name, location, hashrate } = minerData;
    console.log('submit', name, location, hashrate);
    // Regular expression to match the expected format (numeric value)
    const hashratePattern = /^[0-9]+(\.[0-9]+)?$/;

    if (!name || !location || !hashrate) {
      return;
    }

    if (!hashratePattern.test(hashrate)) {
      // Display an error message or handle the invalid format as needed
      console.log('Invalid hashrate format. It should be a numeric value.');
      setHashrateInvalid(true);
      return;
    }
    setHashrateInvalid(false);
    try {
      const modifiedHashRate = hashrate + ' T/S';

      const body = { name, location, hashrate: modifiedHashRate };
      console.log('body', body);
      const response = await fetch(
        `${configs.serverURL}/miner/${currentWorker[0].id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        }
      );

      if (response.ok) {
        onAdd();
        onClose();
        setMinerData({ name: '', location: '', hashrate: '' });
      } else {
        console.log('Failed to create.');
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleInputChange = (event, field) => {
    const { value } = event.target;
    setMinerData({ ...minerData, [field]: value });
  };

  return (
    <Fragment>
      <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Worker</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={onSubmitForm}>
              <FormControl id="name" isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                  type="text"
                  value={minerData.name}
                  onChange={e => handleInputChange(e, 'name')}
                  placeholder="name"
                />
                <FormErrorMessage>
                  Error message for Name field
                </FormErrorMessage>
              </FormControl>

              <FormControl id="location" isRequired>
                <FormLabel>Location</FormLabel>
                <Select
                  value={minerData.location}
                  onChange={e => handleInputChange(e, 'location')}
                  placeholder="Select location"
                  width="100%"
                >
                  {locationOptions.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </Select>
                <FormErrorMessage>
                  Error message for Location field
                </FormErrorMessage>
              </FormControl>

              <FormControl
                id="hashrate"
                isRequired
                isInvalid={isHashrateInvalid}
              >
                <FormLabel>Hash Rate</FormLabel>
                <Input
                  type="text"
                  value={minerData.hashrate}
                  onChange={e => handleInputChange(e, 'hashrate')}
                  placeholder="hash-rate"
                />
                <FormErrorMessage>
                  Only numeric values are allowed
                </FormErrorMessage>
              </FormControl>
              <Button colorScheme="yellow" mt={5} type="submit">
                Change
              </Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Fragment>
  );
};

export default EditWorkerModal;
