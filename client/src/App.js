import React from 'react';
import './App.css';

import { ChakraProvider } from '@chakra-ui/react';
import AuthProvider from './components/login/AuthProvider';
import RoutesCombined from '../src/components/login/Routes';

function App() {
  return (
    <ChakraProvider>
      <AuthProvider>
        <RoutesCombined />
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
