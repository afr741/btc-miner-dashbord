'use client';

import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  useDisclosure,
  useColorModeValue,
  Stack,
  Image,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, LockIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/login/AuthProvider';
import btcLogo from '../assets/images/btc-logo.png';
import avatarImg from '../assets/images/default_avatar.png';

const Links = [
  { label: 'Dashboard', route: 'dashboard' },
  { label: 'Manage Workers', route: 'miners' },
  { label: 'Analytics', route: 'analytics' },
];

const NavLink = props => {
  const { children, route } = props;
  const navigate = useNavigate();
  return (
    <Box
      as="a"
      px={2}
      py={1}
      rounded={'md'}
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('gray.200', 'gray.700'),
      }}
      onClick={() => navigate(`/${route}`)}
    >
      {children}
    </Box>
  );
};

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { setToken } = useAuth();
  const navigate = useNavigate();

  // Function to handle logout
  const handleLogOut = () => {
    setToken('');
    navigate('/', { replace: true });
  };

  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack
            spacing={8}
            alignItems={'center'}
            display={{ base: 'none', md: 'flex' }}
          >
            <Box>
              <Image
                src={btcLogo}
                alt="btc logo"
                boxSize="50"
                objectFit="cover"
                href="/dashboard"
              />
            </Box>
            <HStack as={'nav'} spacing={4}>
              {Links.map(link => (
                <NavLink key={link.label} route={link.route}>
                  {link.label}
                </NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
            <Button
              variant={'solid'}
              colorScheme={'teal'}
              size={'sm'}
              mr={4}
              leftIcon={<LockIcon />}
              onClick={handleLogOut}
            >
              Logout
            </Button>
            <Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}
              >
                <Avatar size={'sm'} src={avatarImg} />
              </MenuButton>
              {/* <MenuList>
                <MenuItem>Link 1</MenuItem>
                <MenuItem>Link 2</MenuItem>
                <MenuDivider />
                <MenuItem>Link 3</MenuItem>
              </MenuList> */}
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links.map(link => (
                <NavLink key={link.label} route={link.route}>
                  {link.label}
                </NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>

      {/* <Box p={4}>Main Content Here</Box> */}
    </>
  );
}
