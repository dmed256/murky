import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';

import classnames from '../../../classnames';
import withBlog from '../../../withBlog'
import * as types from '../../../types';


interface Props {
  classes: any,
  blog: types.Blog,
  tags: string[],
  selectedTags?: Set<string>,
  disabledTags?: Set<string>,
  withCount?: boolean,
}

const Tags = ({
  classes,
  blog,
  tags,
  selectedTags,
  disabledTags,
  withCount,
}: Props) => (
  <div className={classes.root}>
  {
    tags.sort().map((tag) => (
      <div
        key={tag}
        className={classnames(classes.tag,
                              selectedTags && selectedTags.has(tag) && 'selected',
                              disabledTags && disabledTags.has(tag) && 'disabled')}
      >
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
    '&:hover': {
      backgroundColor: '#f0f3f5',
      boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12)',
    },
    '&.selected': {
      fontWeight: 300,
      color: 'white',
      backgroundColor: 'var(--theme-primary-color, #2980b9)'
    },
    '&.disabled': {
      fontWeight: 300,
      color: '#828f9d',
      backgroundColor: '#f3f5f7 !important',
      '&:hover': {
        cursor: 'default',
        boxShadow: 'none',
      },
    },
  },
  count: {
    marginRight: 8,
    paddingRight: 5,
    borderRight: '1px solid #c4cbd2',
  },
};

export default withBlog(withStyles(styles)(Tags));
