import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';

import blog from '../../../blog';


interface Props {
  classes: any,
  tags: string[],
  withCount?: boolean,
}

const Tags = ({ classes, tags, withCount }: Props) => (
  <div className={classes.root}>
  {
    tags.sort().map((tag) => (
      <div key={tag} className={classes.tag}>
        { withCount && (
            <span className={classes.count}>
              {blog.postsBy.tag[tag]}
            </span>
          )}
        {tag}
      </div>
    ))
  }
  </div>
);

const styles = {
  root: {
    display: 'flex' as 'flex',
    fontSize: 12,
    textTransform: 'uppercase' as 'uppercase',
    flexWrap: 'wrap' as 'wrap',
    '@media(max-width: 700px)': {
      fontSize: 10,
    },
  },
  tag: {
    display: 'flex' as 'flex',
    height: 20,
    marginRight: 10,
    padding: '0 10px',
    backgroundColor: '#e8ecf0',
    alignItems: 'center' as 'center',
    cursor: 'pointer',
    '&:last-child': {
      marginRight: 0,
    },
  },
  count: {
    marginRight: 8,
    paddingRight: 5,
    borderRight: '1px solid #c4cbd2',
  },
};

export default withStyles(styles)(Tags);
