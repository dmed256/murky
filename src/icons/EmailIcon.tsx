import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';

import config from '../config';
import MailOutlineIcon from '@material-ui/icons/MailOutline';


interface Props {
  classes: any,
}

const EmailIcon = ({ classes }: Props) => {
  const { email } = config.social;
  let icon = <MailOutlineIcon className={classes.root} />;
  if (email) {
    icon = (
      <a href={`mailto:${email[0]}@${email[1]}.${email[2]}`}>
        {icon}
      </a>
    );
  }
  return icon;
}

const styles = {
  root: {
    color: '#6F6F6F',
    '&:hover': {
      color: 'var(--theme-primary-color, #2980b9)',
    },
  },
};

export default withStyles(styles)(EmailIcon);
