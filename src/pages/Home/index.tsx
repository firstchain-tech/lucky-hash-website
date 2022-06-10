import React from 'react';
import { Box } from '@mui/material';
import Layout from '../../components/Layout';
import Hero from './Hero';
import Rule1 from './Rule1';
import Rule2 from './Rule2';
import Partners from './Partners';

const Home = (): JSX.Element => {
  return (
    <Layout colorInvert={false}>
      <Box>
        <Hero />
        <Rule1 />
      </Box>
      <Box bgcolor={ 'alternate.main' }>
        <Rule2 />
      </Box>
      <Box>
        <Partners />
      </Box>
    </Layout>
  );
};

export default Home;
