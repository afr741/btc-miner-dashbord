import React, { Fragment, useState } from 'react';
import {
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from '@chakra-ui/react';

import { Button } from '@chakra-ui/react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Select,
} from '@chakra-ui/react';
import configs from '../../configs/configs';

const locationOptions = [
  'Mining Facility A',
  'Mining Facility B',
  'Mining Facility C',
];

const AddWorkerModal = ({ isOpen, onClose = () => {}, onAdd, minersData }) => {
  const finalRef = React.useRef(null);

  const [minerData, setMinerData] = useState({
    name: '',
    location: '',
    hashrate: '',
  });

  const [isHashrateInvalid, setHashrateInvalid] = useState(false);

  const handleClose = () => {
    onClose();
  };
  const onSubmitForm = async e => {
    e.preventDefault();

    const { name, location, hashrate } = minerData;
    // console.log(hashrate);
    // Regular expression to match the expected format (numeric value)
    const hashratePattern = /^[0-9]+(\.[0-9]+)?$/;

    if (!name || !location || !hashrate) {
      return;
    }

    if (!hashratePattern.test(hashrate)) {
      // Display an error message or handle the invalid format as needed
      setHashrateInvalid(true);
      return;
    }
    try {
      const modifiedHashRate = hashrate + ' T/S';

      const body = { name, location, hashrate: modifiedHashRate };

      const response = await fetch(`${configs.serverURL}/miners`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

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
                  Invalid hashrate format. It should be a numeric value.
                </FormErrorMessage>
              </FormControl>
              <Button colorScheme="green" mt={5} type="submit">
                Add worker
              </Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Fragment>
  );
};

export default AddWorkerModal;
