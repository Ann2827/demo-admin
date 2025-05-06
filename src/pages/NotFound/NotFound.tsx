import * as React from 'react';
import { Button, Typography } from '@mui/material';
import EastTwoToneIcon from '@mui/icons-material/EastTwoTone';
import { useNavigate } from 'react-router-dom';

import { ROUTE_MAIN } from '@/constants/routes';

import styles from './NotFound.module.scss';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.notFound}>
      <div className={styles.notFound_image} />
      <div className={styles.notFound_content}>
        <Typography
          color='white'
          sx={{ fontWeight: 700, textShadow: '4px 6px 7px #32323269', fontSize: '6rem', lineHeight: '100px' }}
        >
          404
        </Typography>
        <Typography
          variant='h1'
          color='white'
          textAlign='center'
          sx={{
            textDecoration: 'underline',
            textShadow: '4px 6px 7px #32323269',
            fontSize: '6rem',
            lineHeight: '100px',
          }}
        >
          Not Found
        </Typography>
        <Button
          variant='outlined'
          color='white'
          size='large'
          endIcon={<EastTwoToneIcon />}
          sx={{ zIndex: 10, mt: 10 }}
          onClick={() => {
            navigate(ROUTE_MAIN);
          }}
        >
          To main
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
