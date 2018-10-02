import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';

import withBlog from '../../../withBlog';
import * as types from '../../../types';
import Heading from '../../Heading';
import Tags from './Tags';
import Timeline from './Timeline';

interface Props {
  classes: any,
  blog: types.Blog,
}

const LandingPage = ({ classes, blog }: Props) => (
  <div className={classes.root}>
    <h1>Blog</h1>
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

const LandingPageWithStyles = withBlog(withStyles(styles)(LandingPage));

export const plugin = {
  name: 'blog-landing-page',
  Component: LandingPageWithStyles,
  requiredProps: [],
  optionalProps: [],
};

export default LandingPageWithStyles;
