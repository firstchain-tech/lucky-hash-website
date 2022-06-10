import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { PaletteModeProvider } from '../contexts/PaletteModeContext';
import Web3ReactManager from '../components/Web3ReactManager';
import Home from './Home';
// import Bet from './Bet';
// import Banker from './Banker';
import NotFound from './NotFound';

const App = () => {
  return (
    <Web3ReactManager>
      <PaletteModeProvider>
        <Routes>
          <Route path='/' element={ <Home /> } />
          {/* <Route path='/bet' element={ <Bet /> } />
          <Route path='/banker' element={ <Donate /> } /> */}
          <Route path='*' element={ <NotFound /> } />
        </Routes>
      </PaletteModeProvider>
    </Web3ReactManager>
  );
};

export default App;
