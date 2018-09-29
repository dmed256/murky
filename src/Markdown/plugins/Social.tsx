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
  links: string[],
  center: boolean,
}

const Social = ({
  classes,
  tokens,
  links,
  center,
}: Props) => (
  <div className={classnames(classes.root,
                             center && classes.center)}>
    {
      links.map((icon) => {
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

const SocialWithStyles = withStyles(styles)(Social);

export const plugin = {
  name: 'social',
  Component: SocialWithStyles,
  requiredProps: ['links'],
  optionalProps: ['center'],
};

export default SocialWithStyles;
