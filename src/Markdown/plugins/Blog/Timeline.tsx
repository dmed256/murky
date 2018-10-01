import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';

import blog from '../../../blog';
import Post from './Post';


const humanMonth = (month: number) => {
  switch (month) {
  case 1: return 'January';
  case 2: return 'February';
  case 3: return 'March';
  case 4: return 'April';
  case 5: return 'May';
  case 6: return 'June';
  case 7: return 'July';
  case 8: return 'August';
  case 9: return 'September';
  case 10: return 'October';
  case 11: return 'November';
  case 12: return 'December';
  }
  return 'N/A'
};

interface Props {
  classes: any,
}

const Timeline = ({ classes }: Props) => {
  let month = -1;
  const content = blog.posts.map((post) => {
    const { publishDate } = post;
    const postMonth = publishDate.getMonth() + 1;
    let dateLabel;
    if (month != postMonth) {
      month = postMonth;
      dateLabel = `${humanMonth(month)} ${publishDate.getFullYear()}`;
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

const TimelineWithStyles = withStyles(styles)(Timeline);

export const plugin = {
  name: 'blog-entries',
  Component: TimelineWithStyles,
  requiredProps: [],
  optionalProps: [],
};

export default TimelineWithStyles;
