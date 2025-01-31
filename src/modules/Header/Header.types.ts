import { SxProps, Theme } from '@mui/material';

type HeaderMenuItem = { title: string; href: string };

export interface HeaderProps {
  /**
   * Контент в конце
   */
  endContent?: React.ReactNode;

  /**
   * Конфиг элементов меню
   */
  menu?: HeaderMenuItem[];

  /**
   * Стили для root тэга
   */
  sx?: SxProps<Theme>;
}
