import { colors } from '@mui/material';
import { createTheme, PaletteColorOptions } from '@mui/material/styles';
import createPalette from '@mui/material/styles/createPalette';

declare module '@mui/material/styles' {
  interface PaletteColor {
    lighter: string;
    darker: string;
  }
  interface SimplePaletteColorOptions {
    lighter?: string;
    darker?: string;
  }
  interface Palette {
    third: Palette['primary'];
    Backdrop: Partial<{ bg: string }>;
  }
  interface PaletteOptions {
    third?: PaletteOptions['primary'];
    Backdrop?: Partial<{ bg: string }>;
  }
  interface ButtonPropsColorOverrides {
    white: PaletteColorOptions;
  }
}
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    white: true;
  }
}
declare module '@mui/material/Icon' {
  interface IconPropsSizeOverrides {
    huge: true;
  }
}

const lightPalette = createPalette({
  primary: {
    main: '#606BDF',
    dark: '#3944B8',
    light: '#bdc2ff',
    lighter: '#E0E0FF',
    darker: '#000668',
  },
  secondary: {
    main: '#5A5C78',
    dark: '#43455F',
    light: '#C3C4E4',
    lighter: '#dcddf3',
    darker: '#171A31',
  },
  third: {
    main: colors.cyan[500],
    dark: colors.cyan[700],
    light: colors.cyan[100],
    lighter: colors.cyan[50],
    darker: colors.cyan[900],
  },
  error: {
    main: '#de3730',
    light: '#FFDAD6',
    dark: '#BA1A1A',
    lighter: '#FFEDEA',
    darker: '#690005',
  },
  warning: {
    main: '#ae6600',
    light: '#FFDCBE',
    dark: '#8B5000',
    lighter: '#FFEEE1',
    darker: '#4A2800',
  },
  info: {
    main: '#008394',
    light: '#A1EFFF',
    dark: '#006876',
    lighter: '#D4F7FF',
    darker: '#00363E',
  },
  success: {
    main: '#22892f',
    light: '#B6F2AF',
    dark: '#006E1C',
    lighter: '#C8FFC0',
    darker: '#00390A',
  },
  divider: 'rgb(234, 231, 239)',
  text: {
    primary: 'rgb(27, 27, 31)',
    secondary: 'rgb(119, 118, 128)',
    disabled: 'rgba(119, 118, 128, 0.6)',
    // hint: 'rgb(23, 26, 49)',
  },
  grey: {
    50: '#FBF8FF',
    100: '#F5F2FA',
    200: '#EFEDF4',
    300: '#EAE7EF',
    400: '#E4E1E6',
    500: '#DBD9E0',
    600: '#C7C5D0',
    700: '#777680',
    800: '#46464F',
    900: '#1B1B1F',
  },
});

const darkPalette = createPalette({
  primary: {
    main: '#BDC2FF',
    dark: '#E0E0FF',
    light: '#7A86FB',
    lighter: '#2C37AC',
    darker: '#F1EFFF',
  },
  secondary: {
    main: '#C3C4E4',
    dark: '#E0E0FF',
    light: '#8D8EAC',
    lighter: '#43455F',
    darker: '#F1EFFF',
  },
  third: {
    main: colors.cyan[300],
    dark: colors.cyan[100],
    light: colors.cyan[700],
    lighter: colors.cyan[900],
    darker: colors.cyan[50],
    contrastText: '#fff',
  },
  error: {
    main: '#FFDAD6',
    dark: '#FFEDEA',
    light: '#FF897D',
    lighter: '#BA1A1A',
    darker: '#FFF8F7',
  },
  warning: {
    main: '#FFDCBE',
    dark: '#FFEEE1',
    light: '#F79300',
    lighter: '#8B5000',
    darker: '#FFF8F5',
  },
  info: {
    main: '#A1EFFF',
    dark: '#D4F7FF',
    light: '#00BCD4',
    lighter: '#006876',
    darker: '#EEFCFF',
  },
  success: {
    main: '#B6F2AF',
    dark: '#C8FFC0',
    light: '#5DC05E',
    lighter: '#006E1C',
    darker: '#ECFFE4',
  },
  divider: 'rgb(43, 41, 48)',
  text: {
    primary: 'rgb(228, 225, 230)',
    secondary: 'rgb(145, 144, 154)',
    disabled: 'rgba(145, 144, 154, 0.6)',
  },
  grey: {
    50: '#141218',
    100: '#1B1B1F',
    200: '#211F26',
    300: '#2B2930',
    400: '#36343B',
    500: '#0F0D13',
    600: '#46464F',
    700: '#91909A',
    800: '#C7C5D0',
    900: '#E4E1E6',
  },
  background: {
    default: '#0F0D13',
    paper: '#1f1b27',
  },
});

const themeApp = createTheme({
  cssVariables: {
    colorSchemeSelector: 'class',
  },
  colorSchemes: {
    light: {
      palette: {
        ...lightPalette,
        Alert: {
          errorStandardBg: lightPalette.error.lighter,
          infoStandardBg: lightPalette.info.lighter,
          successStandardBg: lightPalette.success.lighter,
          warningStandardBg: lightPalette.warning.lighter,
        },
        TableCell: {
          border: lightPalette.grey[300],
        },
        Backdrop: {
          bg: 'rgba(27, 27, 31, 0.2)',
        },
      },
    },
    dark: {
      palette: {
        ...darkPalette,
        Alert: {
          errorStandardBg: lightPalette.error.light,
          infoStandardBg: lightPalette.info.light,
          successStandardBg: lightPalette.success.light,
          warningStandardBg: lightPalette.warning.light,
          errorIconColor: lightPalette.error.main,
          infoIconColor: lightPalette.info.main,
          successIconColor: lightPalette.success.main,
          warningIconColor: lightPalette.warning.main,
        },
        Backdrop: {
          bg: 'rgba(70, 70, 79, 0.2)',
        },
      },
    },
  },
  shape: {
    borderRadius: 7.5,
  },
  typography: {
    h1: {
      fontSize: '40px',
      lineHeight: '44px',
      letterSpacing: '0',
      fontWeight: 500,
    },
    h2: {
      fontSize: '32px',
      lineHeight: '36px',
      letterSpacing: '0',
      fontWeight: 500,
    },
    h3: {
      fontSize: '28px',
      lineHeight: '32px',
      letterSpacing: '0',
      fontWeight: 500,
    },
    h4: {
      fontSize: '24px',
      lineHeight: '28px',
      letterSpacing: '0',
      fontWeight: 500,
    },
    h5: {
      fontSize: '20px',
      lineHeight: '24px',
      letterSpacing: '0',
      fontWeight: 500,
    },
    h6: {
      fontSize: '18px',
      lineHeight: '22px',
      letterSpacing: '0',
      fontWeight: 500,
    },
    subtitle1: {
      fontSize: '16px',
      lineHeight: '20px',
      letterSpacing: '0',
      fontWeight: 500,
    },
    subtitle2: {
      fontSize: '14px',
      lineHeight: '18px',
      letterSpacing: '0',
      fontWeight: 500,
    },
    body1: {
      fontSize: '16px',
      lineHeight: '20px',
      letterSpacing: '0',
      fontWeight: 400,
    },
    body2: {
      fontSize: '14px',
      lineHeight: '18px',
      letterSpacing: '0',
      fontWeight: 400,
    },
    caption: {
      fontSize: '12px',
      lineHeight: '16px',
      letterSpacing: '0',
      fontWeight: 400,
    },
  },
  components: {
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
        },
      },
    },
    MuiBackdrop: {
      variants: [
        {
          props: { invisible: false },
          style: ({ theme }) =>
            theme.unstable_sx({
              backgroundColor: theme.palette.Backdrop.bg,
            }),
        },
      ],
    },
    MuiPaper: {
      variants: [
        {
          props: { square: false },
          style: {
            borderRadius: '16px',
          },
        },
      ],
    },
    MuiIcon: {
      variants: [
        {
          props: { fontSize: 'huge' },
          style: {
            fontSize: '4rem',
          },
        },
      ],
    },
    MuiButton: {
      styleOverrides: {
        root: {
          variants: [
            {
              props: { variant: 'outlined', color: 'white' },
              style: {
                border: `1px solid white`,
                color: 'white',
                filter: 'drop-shadow(2px 4px 6px black)',
              },
            },
          ],
        },
      },
    },
  },
});

export default themeApp;
