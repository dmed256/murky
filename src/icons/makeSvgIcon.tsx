import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import withStyles from '@material-ui/core/styles/withStyles';


interface BaseProps {
  classes: any,
  d: string,
  link?: string,
  props?: any,
}

interface SvgMakerProps {
  d: string,
  hoverColor?: string,
  link?: string,
  staticProps?: any,
}


const BaseSvgIcon = ({ classes, d, ...props }: BaseProps) => {
  const { link } = props as any;
  let icon = (
    <SvgIcon className={classes.root} {...props}>
      <path d={d} fill="currentColor" />
    </SvgIcon>
  );
  if (link) {
    icon = <a href={link}>{icon}</a>;
  }
  return icon;
};

const makeSvgIcon = ({ d, hoverColor, ...staticProps }: SvgMakerProps) => {
  const Icon = withStyles({
    root: {
      color: '#6F6F6F',
      '&:hover': {
        color: hoverColor,
      },
    },
  })(BaseSvgIcon);
  return (props: any) => (
    <Icon
      d={d}
      {...{...staticProps, ...props}}
    />
  );
};

export default makeSvgIcon;
