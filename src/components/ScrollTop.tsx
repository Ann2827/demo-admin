import { Box, Fade } from '@mui/material';
import * as React from 'react';

const ScrollTop: React.FC<React.PropsWithChildren<{ scrollId: string }>> = ({ children, scrollId }) => {
  const [trigger, setTrigger] = React.useState<boolean>(false);
  React.useEffect(() => {
    const anchor = document.getElementById(scrollId);
    const callback = () => {
      setTrigger((anchor?.scrollTop || 0) > 100);
    };
    anchor?.addEventListener('scroll', callback);

    return () => anchor?.removeEventListener('scroll', callback);
  }, [scrollId]);

  const handleClick = () => {
    document.getElementById(scrollId)?.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <Fade in={trigger}>
      <Box onClick={handleClick} role='presentation' sx={{ position: 'fixed', bottom: 16, right: 16, zIndex: 1 }}>
        {children}
      </Box>
    </Fade>
  );
};

export default ScrollTop;
