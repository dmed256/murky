import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';

import blog from '../../../blog';
import Heading from '../../Heading';
import Tags from './Tags';
import Timeline from './Timeline';

interface Props {
  classes: any,
}

const LandingPage = ({ classes }: Props) => (
  <div className={classes.root}>
    <Heading Tag="h1" label="Blog" />
    <Tags
      classes={{ root: classes.padding }}
      tags={Object.keys(blog.postsBy.tag)}
      withCount
    />
    <Timeline classes={{ root: classes.padding }} />
  </div>
);

const styles = {
  root: {
  },
  padding: {
    marginTop: 50,
    '@media(max-width: 700px)': {
      marginTop: 25,
    },
  },
};

const LandingPageWithStyles = withStyles(styles)(LandingPage);

export const plugin = {
  name: 'blog-landing-page',
  Component: LandingPageWithStyles,
  requiredProps: [],
  optionalProps: [],
};

export default LandingPageWithStyles;
