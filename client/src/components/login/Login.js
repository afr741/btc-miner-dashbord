import { useCallback, useState } from 'react';
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Avatar,
  FormControl,
  InputRightElement,
  FormErrorMessage,
} from '@chakra-ui/react';
import { FaUserAlt, FaLock } from 'react-icons/fa';
import { useAuth } from '../login/AuthProvider';
import { useNavigate } from 'react-router-dom';
import configs from '../../configs/configs';

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  const [stateInfo, setStateInfo] = useState({ loading: false, message: '' });

  const navigate = useNavigate();
  const { setToken } = useAuth();

  const handleShowClick = () => setShowPassword(!showPassword);
  const handleLogin = async e => {
    e.preventDefault();

    setStateInfo({
      message: '',
      loading: true,
    });
    try {
      let { username, password } = credentials;
      const response = await fetch(`${configs.serverURL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: username, password: password }),
      });
      const data = await response.json();
      if (data.token) {
        const token = data.token;
        setStateInfo({
          loading: false,
          message: response.statusText,
        });
        localStorage.setItem('token', token);
        setToken(token);
        navigate('/', { replace: true });
      } else {
        setErrorMessage('Incorrect email or password');
      }
    } catch (error) {
      // console.error('Login failed:', error.message);

      setStateInfo({
        loading: false,
        message: error.message,
      });
    }
  };

  const handleInputChange = useCallback(
    (event, field) => {
      const { value } = event.target;
      setCredentials({ ...credentials, [field]: value });
      setErrorMessage('');
    },
    [setErrorMessage, credentials]
  );

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor="gray.200"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
        mt={-200}
      >
        <Avatar bg="teal.500" />
        <Heading color="teal.400">Welcome</Heading>
        <Box minW={{ base: '90%', md: '468px' }}>
          <form onSubmit={handleLogin}>
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="whiteAlpha.900"
              boxShadow="md"
            >
              <FormControl isInvalid={errorMessage}>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaUserAlt color="gray.300" />}
                  />
                  <Input
                    type="text"
                    placeholder="username"
                    onChange={e => handleInputChange(e, 'username')}
                  />
                </InputGroup>
              </FormControl>
              <FormErrorMessage>{errorMessage}</FormErrorMessage>
              <FormControl isInvalid={errorMessage}>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    children={<CFaLock color="gray.300" />}
                  />
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    onChange={e => handleInputChange(e, 'password')}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? 'Hide' : 'Show'}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>{errorMessage}</FormErrorMessage>
              </FormControl>
              <Button
                borderRadius={0}
                type="submit"
                variant="solid"
                colorScheme="teal"
                width="full"
              >
                Login
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Login;
