import React from 'react';
import { useTheme, Container, Box, Grid, Typography, Link, Button } from '@mui/material';
import Layout from '../../components/Layout';

import notFoundBackground from '../../assets/images/not-found-background.svg';

const NotFound = () => {
  const theme = useTheme();

  return (
    <Layout colorInvert={true}>
      <Container>
        <Grid
          container
          spacing={2}
          sx={{
            paddingY: 2
          }}
        >
          <Grid
            container
            item
            alignItems={'center'}
            xs={12}
            md={7}
          >
            <Box>
              <Typography
                variant="h1"
                sx={{ fontWeight: 700 }}
              >
                {'404'}
              </Typography>
              <Typography
                variant="h6"
                color="text.secondary"
              >
                {'哎呀！看起來你點擊了一個錯誤的鏈接。'}
              </Typography>
              <Typography
                variant="h6"
                color="text.secondary"
              >
                {'如果您認為這是我們的問題，請'}
                <Link href={''} underline="none">
                  {'告訴我們。'}
                </Link>
              </Typography>
              <Box
                marginTop={4}
                display={'flex'}
                justifyContent={{ xs: 'center', md: 'flex-start' }}
              >
                <Button
                  component={Link}
                  variant="contained"
                  color="primary"
                  size="large"
                  href={'/'}
                >
                  {'回到首页'}
                </Button>
              </Box>
            </Box>
          </Grid>
          <Grid container item xs={12} md={5}>
            <Box height={1} width={1}>
              <Box
                component={'img'}
                src={ notFoundBackground }
                width={1}
                height={1}
                sx={{
                  filter: theme.palette.mode === 'dark' ? 'brightness(0.8)' : 'none',
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default NotFound;
