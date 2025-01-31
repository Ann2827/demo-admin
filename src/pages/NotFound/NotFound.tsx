import * as React from 'react';
import { Button, Typography } from '@mui/material';
import EastTwoToneIcon from '@mui/icons-material/EastTwoTone';
import { useNavigate } from 'react-router-dom';
import { NeedsActionTypes, NeedsStore } from 'library-react-hooks';

import { ROUTE_MAIN } from '@/constants/routes';

import styles from './NotFound.module.scss';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.notFound}>
      <div className={styles.notFound_image} />
      <div className={styles.notFound_content}>
        <Typography
          variant='h1'
          color='white'
          sx={{ fontWeight: 700, textShadow: '4px 6px 7px #32323269', fontSize: '6rem' }}
        >
          404
        </Typography>
        <Typography
          variant='h1'
          color='white'
          sx={{ textDecoration: 'underline', textShadow: '4px 6px 7px #32323269', fontSize: '6rem' }}
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
            NeedsStore.action('profile', NeedsActionTypes.refresh);
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
