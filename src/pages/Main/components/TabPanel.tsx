import { Stack, Typography } from '@mui/material';

export interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Stack p={3} alignItems='center'>
          <Typography color='textSecondary' textAlign='center' width='80%'>
            {children}
          </Typography>
        </Stack>
      )}
    </div>
  );
}

export default TabPanel;
