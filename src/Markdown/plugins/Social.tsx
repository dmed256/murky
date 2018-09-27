import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';

import classnames from '../../classnames';
import {
  EmailIcon,
  GithubIcon,
  LinkedinIcon,
  TwitterIcon,
} from '../../icons';
import * as types from '../types';

interface Props {
  classes: any,
  tokens: types.Token[],
  center: boolean,
  varargs: string[],
}

const Social = ({
  classes,
  tokens,
  center,
  varargs,
}: Props) => (
  <div className={classnames(classes.root,
                             center && classes.center)}>
    {
      varargs.map((icon) => {
        let iconContent;
        switch (icon) {
          case 'email':
            iconContent = <EmailIcon />;
            break;
          case 'github':
            iconContent = <GithubIcon />;
            break;
          case 'linkedin':
            iconContent = <LinkedinIcon />;
            break;
          case 'twitter':
            iconContent = <TwitterIcon />;
            break;
          default:
            return null;
        }
        return (
          <div key={icon} className={classes.icon}>
            {iconContent}
          </div>
        );
      })
    }
  </div>
);

const styles = {
  root: {
    display: 'flex' as 'flex',
  },
  center: {
    alignItems: 'center' as 'center',
    justifyContent: 'center' as 'center',
  },
  icon: {
    margin: '0 1em',
  },
};

export default {
  name: 'social',
  Component: withStyles(styles)(Social),
  requiredProps: [],
  optionalProps: ['center'],
  varArgs: true,
};
