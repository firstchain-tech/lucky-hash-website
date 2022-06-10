import React, { useState, useEffect } from 'react';
import {
  useTheme,
  Container,
  Box,
  Typography,
  Stack,
  FormControlLabel,
  RadioGroup,
  Radio,
  TextField,
  InputAdornment,
  Button
} from '@mui/material';

import mainBackground from '../../assets/images/main-background.jpg';

const Hero = (): JSX.Element => {
  const theme = useTheme();

  const [betType, setBetType] = useState(0);
  const [betAmount, setBetAmount] = useState('100');

  useEffect(() => {
    const jarallaxInit = async () => {
      const jarallaxElems = document.querySelectorAll('.jarallax');
      if (!jarallaxElems || (jarallaxElems && jarallaxElems.length === 0)) {
        return;
      }

      const { jarallax } = await require('jarallax');
      jarallax(jarallaxElems, { speed: 0.2 });
    };

    jarallaxInit();
  });

  return (
    <Box
      className={'jarallax'}
      sx={{
        height: '105vh',
        marginTop: -10,
        paddingTop: { xs: 20, sm: 15, md: 10 },
        paddingBottom: 5,
        position: 'relative',
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <Box
        className={'jarallax-img'}
        sx={{
          position: 'absolute',
          objectFit: 'cover',
          fontFamily: 'object-fit: cover;',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundImage: 'url(' + mainBackground + ')',
        }}
      />
      <Container>
        <Box
          sx={{
            padding: 5,
            borderRadius: 2.5,
            backgroundColor: theme.palette.background.paper,
            opacity: .9
          }}
        >
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            defaultValue="1"
            sx={{
              marginBottom: 2
            }}
          >
            <Stack spacing={1}>
              <Box>
                <Typography component={'h6'}>
                  {'單註：最高賠率 2 倍'}
                </Typography>
                <FormControlLabel value="1" control={<Radio />} label="小" />
                <FormControlLabel value="2" control={<Radio />} label="大" />
                <FormControlLabel value="3" control={<Radio />} label="單" />
                <FormControlLabel value="4" control={<Radio />} label="雙" />
              </Box>
              <Box>
                <Typography component={'h6'}>
                  {'組合：最高賠率 4 倍'}
                </Typography>
                <FormControlLabel value="6" control={<Radio />} label="小 + 雙" />
                <FormControlLabel value="7" control={<Radio />} label="小 + 單" />
                <FormControlLabel value="8" control={<Radio />} label="大 + 雙" />
                <FormControlLabel value="9" control={<Radio />} label="大 + 單" />
              </Box>
              <Box>
                <Typography component={'h6'}>
                  {'龍虎：最高賠率 8 倍'}
                </Typography>
                <FormControlLabel value="0" control={<Radio />} label="龍" />
                <FormControlLabel value="5" control={<Radio />} label="虎" />
              </Box>
            </Stack>
          </RadioGroup>
          <TextField
            type="number"
            value={ betAmount }
            onChange={ (event: React.ChangeEvent<HTMLInputElement>) => { setBetAmount(event.target.value); } }
            InputProps={{
              endAdornment: <InputAdornment position="end">USDT</InputAdornment>,
            }}
            label="押注金額"
            helperText="押注限額為 100-10000 USDT"
            size="small"
            fullWidth
            sx={{
              marginBottom: 2
            }}
          />
          <Button
            variant="contained"
            size="large"
            // onClick={ donateAction }
          >
            {'確認押注'}
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Hero;
