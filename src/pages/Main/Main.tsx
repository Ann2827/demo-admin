import * as React from 'react';
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Fab,
  Icon,
  Paper,
  Stack,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import AccessTimeFilledRoundedIcon from '@mui/icons-material/AccessTimeFilledRounded';
import CurrencyRubleRoundedIcon from '@mui/icons-material/CurrencyRubleRounded';
import LaptopChromebookRoundedIcon from '@mui/icons-material/LaptopChromebookRounded';
import Grid from '@mui/material/Grid2';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

import Product1Img from '@/assets/images/product1.jpg';
import Product2Img from '@/assets/images/product2.jpg';
import { ROUTE_LOGIN } from '@/constants/routes';
import { Footer, Header } from '@/modules';
import { Carousel, ScrollTop } from '@/components';
import KeyboardArrowUp from '@mui/icons-material/KeyboardArrowUp';
import theme from '@/theme';

import { Background, TabPanel } from './components';

const features = [
  {
    icon: AccessTimeFilledRoundedIcon,
    text: 'page.main.features.time',
  },
  {
    icon: CurrencyRubleRoundedIcon,
    text: 'page.main.features.costs',
  },
  {
    icon: LaptopChromebookRoundedIcon,
    text: 'page.main.features.device',
  },
];

const products = [
  {
    image: Product1Img,
    title: 'page.main.products.1.title',
    text: 'page.main.products.1.description',
  },
  {
    image: Product2Img,
    title: 'page.main.products.2.title',
    text: 'page.main.products.2.description',
  },
];

const pricing = [
  { name: 'page.main.pricing.options.programs', personal: true, pro: true, enterprise: true },
  { name: 'page.main.pricing.options.domain', personal: false, pro: true, enterprise: true },
  { name: 'page.main.pricing.options.whiteLabel', personal: false, pro: true, enterprise: true },
  { name: 'page.main.pricing.options.manager', personal: false, pro: false, enterprise: true },
];

const menuConfig = {
  products: { title: 'page.main.products.title', id: 'products' },
  pricing: { title: 'page.main.pricing.title', id: 'pricing' },
};

const HEADER_HEIGHT = '64px';

const Main: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const headerMenu = React.useMemo(
    () => Object.entries(menuConfig).map(([, { title, id }]) => ({ title: t(title), href: '#' + id })),
    [t],
  );

  const [activeTab, setActiveTab] = React.useState(0);
  const handleChangeTab = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Stack width='100%' sx={{ position: 'relative' }}>
      <Stack direction='column' sx={{ zIndex: 2 }}>
        <Header
          menu={headerMenu}
          endContent={
            <Button
              color='inherit'
              onClick={() => {
                navigate(ROUTE_LOGIN);
              }}
              sx={{ flexGrow: 0 }}
            >
              {t('action.login')}
            </Button>
          }
        />
        <Container component='main' sx={{ mt: HEADER_HEIGHT }}>
          <Stack flexDirection='column' m={{ md: 4, xs: 1 }} alignItems='center'>
            <Typography variant='h1' textAlign='center' mt={{ xs: 0, md: 8 }}>
              {t('{{name}}')}
            </Typography>
            <Typography color='textSecondary' mt={3} width={{ md: '70%' }} textAlign='center'>
              {t('page.main.description')}
            </Typography>

            <Grid container spacing={3} mt={6} display={{ xs: 'none', md: 'inherit' }}>
              {features.map(({ icon, text }, id) => (
                <Grid key={id} size={4}>
                  <Paper elevation={0} sx={{ height: '100%', bgcolor: 'inherit' }}>
                    <Stack direction='column' gap={3} alignItems='center' p={3}>
                      <Icon component={icon} sx={{ fontSize: '3rem' }} color='primary' />
                      <Typography color='textSecondary' textAlign='center'>
                        {t(text)}
                      </Typography>
                    </Stack>
                  </Paper>
                </Grid>
              ))}
            </Grid>

            <Stack alignItems='center' mt={6} sx={{ display: { md: 'none' } }}>
              <Tabs value={activeTab} onChange={handleChangeTab}>
                {features.map(({ icon }, id) => (
                  <Tab key={id} icon={<Icon component={icon} color='primary' />} />
                ))}
              </Tabs>
              {features.map(({ text }, id) => (
                <TabPanel key={id} value={activeTab} index={id}>
                  {text}
                </TabPanel>
              ))}
            </Stack>
          </Stack>

          <Stack flexDirection='column' m={{ md: 4, xs: 1 }} alignItems='center' id={menuConfig.products.id}>
            <Typography variant='h2' textAlign='center' mt={HEADER_HEIGHT}>
              {t('page.main.products.title')}
            </Typography>
            <Typography color='textSecondary' mt={3} width='70%' textAlign='center'>
              {t('page.main.products.description')}
            </Typography>

            <Carousel sx={{ mt: 4, width: '100%' }}>
              {products.map(({ image, title, text }, id) => (
                <Card
                  elevation={0}
                  sx={{ width: { md: 345, xs: 240 }, bgcolor: theme.palette.third.light, height: '100%' }}
                  key={id}
                >
                  <CardActionArea sx={{ height: '100%', display: 'contents' }}>
                    <CardMedia component='img' height='140' image={image} />
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant='h5'
                        color={theme.palette.getContrastText(theme.palette.third.light)}
                      >
                        {t(title)}
                      </Typography>
                      <Typography variant='body2' color={theme.palette.getContrastText(theme.palette.third.light)}>
                        {t(text)}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              ))}
            </Carousel>
          </Stack>

          <Stack flexDirection='column' m={{ md: 4, xs: 1 }} alignItems='center' id={menuConfig.pricing.id}>
            <Typography variant='h2' textAlign='center' mt={HEADER_HEIGHT}>
              {t('page.main.pricing.title')}
            </Typography>

            <TableContainer sx={{ mt: 4, 'td, th': { borderColor: theme.palette.third.main, borderWidth: '0.1rem' } }}>
              <Table sx={{ minWidth: 650 }}>
                <TableHead>
                  <TableRow sx={{ th: { fontWeight: 800 } }}>
                    <TableCell align='right'></TableCell>
                    <TableCell align='center'>{t('page.main.pricing.programs.personal')}</TableCell>
                    <TableCell align='center'>{t('page.main.pricing.programs.pro')}</TableCell>
                    <TableCell align='center'>{t('page.main.pricing.programs.enterprise')}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {pricing.map(({ name, personal, pro, enterprise }, id) => (
                    <TableRow key={id}>
                      <TableCell component='th' scope='row' align='right'>
                        {t(name)}
                      </TableCell>
                      <TableCell align='center'>
                        <Icon component={personal ? CheckRoundedIcon : CloseRoundedIcon} />
                      </TableCell>
                      <TableCell align='center'>
                        <Icon component={pro ? CheckRoundedIcon : CloseRoundedIcon} />
                      </TableCell>
                      <TableCell align='center'>
                        <Icon component={enterprise ? CheckRoundedIcon : CloseRoundedIcon} />
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0, fontWeight: 800 } }}>
                    <TableCell component='th' scope='row' align='right'></TableCell>
                    <TableCell align='center'>
                      {t('label.cost', { value: t('page.main.pricing.cost.personal') })}
                    </TableCell>
                    <TableCell align='center'>{t('label.cost', { value: t('page.main.pricing.cost.pro') })}</TableCell>
                    <TableCell align='center'>
                      {t('label.cost', { value: t('page.main.pricing.cost.enterprise') })}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <Typography color='textSecondary' mt={3} alignSelf='flex-start' variant='body2'>
              {t('page.main.pricing.hint')}
            </Typography>
          </Stack>
        </Container>
        <ScrollTop scrollId='root'>
          <Fab size='small' aria-label='scroll back to top' color='primary'>
            <KeyboardArrowUp />
          </Fab>
        </ScrollTop>
        <Footer />
      </Stack>
      <Background />
    </Stack>
  );
};

export default Main;
