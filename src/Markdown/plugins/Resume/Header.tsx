import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';

import {
  EmailIcon,
  GithubIcon,
  LinkedinIcon,
  TwitterIcon,
} from '../../../icons';
import config from '../../../config';


// Either link or email
const getLabelLink = (label: string) => {
  if (label.search(/https?:/) === 0) {
    return label;
  }
  return `mailto:${label}`;
}

interface Props {
  classes: any,
}

const Header = ({ classes }: Props) => {
  const infoItems = [
    { Component: EmailIcon, label: config.social.fullEmail },
    { Component: GithubIcon, label: config.social.githubLink },
    { Component: TwitterIcon, label: config.social.twitterLink },
    { Component: LinkedinIcon, label: config.social.linkedinLink },
  ].filter(({ label }) => label);

  return (
    <div className={classes.root}>
      <div className={classes.profile}>
        <div className="name">
          {config.profile.name}
        </div>
        <div className="title">
          {config.profile.title}
        </div>
      </div>
      <div className={classes.info}>
        {
          infoItems.map(({ Component, label }) => (
            <div key={label} className={classes.infoItem}>
              <Component link={null} />
              <a
                className="link"
                href={getLabelLink(label as string)}
                target="_blank"
                rel="noopener noreferrer"
              >
                {label}
              </a>
            </div>
          ))
        }
      </div>
    </div>
  );
};

const styles = {
  root: {
    display: 'flex',
    alignItems: 'center' as 'center',
  },
  profile: {
    flex: 1,
    '& .name': {
      fontSize: 40,
      fontWeight: 600,
      letterSpacing: 2,
      textTransform: 'uppercase' as 'uppercase',
      marginLeft: -2,
    },
    '& .title': {
      fontSize: 20,
      fontWeight: 300,
      letterSpacing: 2,
      textTransform: 'uppercase' as 'uppercase',
    },
    '@media (max-width: 700px)': {
      textAlign: 'center' as 'center',
      '& .name': {
        fontSize: 20,
      },
      '& .title': {
        marginTop: 10,
        fontSize: 14,
      },
    },
    '@media print': {
      textAlign: 'left !important' as any,
      '& .name': {
        fontSize: '30px !important',
      },
      '& .title': {
        marginTop: '0 !important',
        fontSize: '18px !important',
      },
    },
  },
  info: {
    paddingLeft: 30,
  },
  infoItem: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 8,
    '&:first-child': {
      marginTop: 0,
    },
    '& > svg': {
      marginRight: 14,
      fontSize: 18,
      color: 'var(--theme-grey, #34495e)',
    },
    '& > .link': {
      color: 'var(--theme-grey, #34495e)',
      fontWeight: 300,
      fontSize: 14,
      '&:hover': {
        color: 'var(--theme-primary-color, #2980b9)',
      },
    },
    '@media (max-width: 700px)': {
      '& .svg': {
        fontSize: 16,
        marginRight: 12,
      },
      '& .link': {
        fontSize: 12,
      },
    },
    '@media print': {
      '& .svg': {
        fontSize: '12px !important',
        marginRight: 12,
      },
      '& .link': {
        fontSize: 12,
      },
    },
  },
}

export default withStyles(styles)(Header);
