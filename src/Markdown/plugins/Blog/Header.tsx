import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';

import history from '../../../history'
import withBlog from '../../../withBlog'
import * as types from '../../../types';
import Heading from '../../Heading';
import Tags from './Tags';
import * as utils from './utils';


interface Props {
  classes: any,
  blog: types.Blog,
}

const Header = ({ classes, blog }: Props) => {
  if (!blog) {
    return null;
  }
  const posts = blog.posts.filter((post) => (
    post.filename === history.pathname
  ));
  if (posts.length !== 1) {
    return null;
  }
  const post = posts[0] as types.BlogPost;
  return (
    <div className={classes.root}>
      <Heading Tag="h1" label={post.title} />
      <div className={classes.info}>
        <span>
          {utils.blogDate(post.publishDate)}
        </span>
        &nbsp;
        <span className={classes.readingTime}>
          Estimated reading time: {post.readingTime}
        </span>
      </div>
      <Tags
        classes={{ root: classes.tagsRoot }}
        blog={blog}
        tags={post.tags}
      />
    </div>
  );
};

const styles = {
  root: {
    marginBottom: 50,
  },
  info: {
    color: '#626c76',
    fontSize: 14,
    letterSpacing: '0.04em',
  },
  readingTime: {
    marginLeft: 10,
    color: '#afb1b7',
    fontStyle: 'italic' as 'italic',
    fontWeight: 300,
  },
  tagsRoot: {
    marginTop: 10,
  },
};

const HeaderWithStyles = withBlog(withStyles(styles)(Header));

export const plugin = {
  name: 'blog-header',
  Component: HeaderWithStyles,
  requiredProps: [],
  optionalProps: [],
};

export default HeaderWithStyles;
