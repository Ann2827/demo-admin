import * as React from 'react';
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
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
import { Carousel } from '@/components';
import theme from '@/theme';

import { Background, TabPanel } from './components';

const features = [
  {
    icon: AccessTimeFilledRoundedIcon,
    text: 'Как уже неоднократно упомянуто, сделанные на базе интернет-аналитики выводы объявлены нарушающими общечеловеческие нормы этики и морали.',
  },
  {
    icon: CurrencyRubleRoundedIcon,
    text: 'Предварительные выводы неутешительны: высокотехнологичная концепция общественного уклада в значительной степени обусловливает важность модели развития.',
  },
  {
    icon: LaptopChromebookRoundedIcon,
    text: 'Наше дело не так однозначно, как может показаться: понимание сути ресурсосберегающих технологий предоставляет широкие возможности для существующих финансовых и административных условий.',
  },
];

const products = [
  {
    image: Product1Img,
    title: 'Название',
    text: 'И нет сомнений, что тщательные исследования конкурентов указаны как претенденты на роль ключевых факторов.',
  },
  {
    image: Product2Img,
    title: 'Название',
    text: 'Учитывая ключевые сценарии поведения, новая модель организационной деятельности способствует повышению качества анализа существующих паттернов поведения.',
  },
];

const pricing = [
  { name: 'Unlimited programs', essential: true, pro: true, enterprise: true },
  { name: 'Custom domain', essential: false, pro: true, enterprise: true },
  { name: 'Full white label', essential: false, pro: true, enterprise: true },
  { name: 'Dedicated personal manager', essential: false, pro: '', enterprise: true },
];

const menuConfig = {
  products: { title: 'Products', id: 'products' },
  pricing: { title: 'Pricing', id: 'pricing' },
};
const headerMenu = Object.entries(menuConfig).map(([, { title, id }]) => ({ title, href: '#' + id }));

const HEADER_HEIGHT = '64px';

const Main: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

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
              Login
            </Button>
          }
        />
        <Container component='main' sx={{ mt: HEADER_HEIGHT }}>
          <Stack flexDirection='column' m={{ md: 4, xs: 1 }} alignItems='center'>
            <Typography variant='h1' textAlign='center' mt={{ xs: 0, md: 8 }}>
              {t('{{name}}')}
            </Typography>
            <Typography color='textSecondary' mt={3} width={{ md: '70%' }} textAlign='center'>
              Картельные сговоры не допускают ситуации, при которой тщательные исследования конкурентов неоднозначны и
              будут объективно рассмотрены соответствующими инстанциями. В своём стремлении улучшить пользовательский
              опыт мы упускаем, что предприниматели в сети интернет будут обнародованы.
            </Typography>
            <Grid container spacing={3} mt={6} display={{ xs: 'none', md: 'inherit' }}>
              {features.map(({ icon, text }, id) => (
                <Grid key={id} size={4}>
                  <Paper elevation={0} sx={{ height: '100%', bgcolor: 'inherit' }}>
                    <Stack direction='column' gap={3} alignItems='center' p={3}>
                      <Icon component={icon} sx={{ fontSize: '3rem' }} color='primary' />
                      <Typography color='textSecondary' textAlign='center'>
                        {text}
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
              Products
            </Typography>
            <Typography color='textSecondary' mt={3} width='70%' textAlign='center'>
              Задача организации, в особенности же перспективное планирование однозначно фиксирует необходимость вывода
              текущих активов.
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
                        {title}
                      </Typography>
                      <Typography variant='body2' color={theme.palette.getContrastText(theme.palette.third.light)}>
                        {text}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              ))}
            </Carousel>
          </Stack>
          <Stack flexDirection='column' m={{ md: 4, xs: 1 }} alignItems='center' id={menuConfig.pricing.id}>
            <Typography variant='h2' textAlign='center' mt={HEADER_HEIGHT}>
              Pricing
            </Typography>
            <TableContainer sx={{ mt: 4, 'td, th': { borderColor: theme.palette.third.main, borderWidth: '0.1rem' } }}>
              <Table sx={{ minWidth: 650 }}>
                <TableHead>
                  <TableRow sx={{ th: { fontWeight: 800 } }}>
                    <TableCell align='right'></TableCell>
                    <TableCell align='center'>Essential</TableCell>
                    <TableCell align='center'>Pro</TableCell>
                    <TableCell align='center'>Enterprise</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {pricing.map(({ name, essential, pro, enterprise }, id) => (
                    <TableRow key={id}>
                      <TableCell component='th' scope='row' align='right'>
                        {name}
                      </TableCell>
                      <TableCell align='center'>
                        <Icon component={essential ? CheckRoundedIcon : CloseRoundedIcon} />
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
                    <TableCell align='center'>500 руб./мес.</TableCell>
                    <TableCell align='center'>2000 руб./мес.</TableCell>
                    <TableCell align='center'>3000 руб./мес.</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <Typography color='textSecondary' mt={3} alignSelf='flex-start' variant='body2'>
              * Значимость этих проблем настолько очевидна, что синтетическое тестирование предполагает независимые
              способы реализации инновационных методов управления процессами.
            </Typography>
          </Stack>
        </Container>
        <Footer />
      </Stack>
      <Background />
    </Stack>
  );
};

export default Main;
