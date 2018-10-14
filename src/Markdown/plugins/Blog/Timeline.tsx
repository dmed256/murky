import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';

import withBlog from '../../../withBlog'
import * as types from '../../../types';
import Post from './Post';
import * as utils from './utils';


interface Props {
  classes: any,
  blog: types.Blog,
}

const Timeline = ({ classes, blog }: Props) => {
  let month = -1;
  const content = blog.posts.map((post) => {
    const { publishDate } = post;
    const postMonth = publishDate.getMonth() + 1;
    let dateLabel;
    if (month !== postMonth) {
      month = postMonth;
      dateLabel = utils.timelineDate(publishDate);
    }
    return (
      <Post
        key={post.filename}
        post={post}
        dateLabel={dateLabel}
      />
    );
  });

  return (
    <div className={classes.root}>
      {content}
    </div>
  );
};

const styles = {
  root: {
    display: 'flex' as 'flex',
    flexDirection: 'column' as 'column',
    letterSpacing: 0.3,
  },
};

const TimelineWithStyles = withBlog(withStyles(styles)(Timeline));

export const plugin = {
  name: 'blog-entries',
  Component: TimelineWithStyles,
  requiredProps: [],
  optionalProps: [],
};

export default TimelineWithStyles;
