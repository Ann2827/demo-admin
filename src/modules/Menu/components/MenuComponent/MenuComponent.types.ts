import { SvgIconTypeMap, SxProps, Theme } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';

import { IProfile } from '@/types/validation';

export type MenuComponentConfigItem = {
  route: string;
  text: string;
  icon: OverridableComponent<SvgIconTypeMap<object, 'svg'>> & {
    muiName: string;
  };
  bage?: number;
};

export type MenuComponentProfileConfigItemAction = {
  text: string;
  icon: OverridableComponent<SvgIconTypeMap<object, 'svg'>> & {
    muiName: string;
  };
  action: (...args: any) => void;
};
export type MenuComponentProfileConfigItem = MenuComponentProfileConfigItemAction | { node: React.ReactNode };

export interface MenuComponentProps {
  config: MenuComponentConfigItem[];

  onItemAction: (props: MenuComponentConfigItem) => void;

  activeRoute: string;

  profile: IProfile | null;

  profileConfig: MenuComponentProfileConfigItem[];

  onClose?: (...args: any) => void;

  sx?: SxProps<Theme>;
}
