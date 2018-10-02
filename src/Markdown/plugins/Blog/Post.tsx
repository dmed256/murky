import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';

import classnames from '../../../classnames';
import { getHashPathname } from '../../../history';
import * as types from '../../../types';

import Tags from './Tags';


const stringifyDate = (d: Date) => {
  const month = d.getMonth() + 1;
  const day = d.getDate();
  let s = '';
  if (month < 10) s += '0';
  s += `${month}/`;
  if (day < 10) s += '0';
  s += `${day}`;
  return s;
};

interface Props {
  classes: any,
  post: types.BlogPost,
  dateLabel?: string,
}

const Post = ({ classes, post, dateLabel }: Props) => (
  <div className={classes.root}>
    <div className={classnames(classes.date, 'with-dot', dateLabel && 'color-dot')}>
      {dateLabel}
    </div>
    <div className={classes.content}>
      <span className={classes.fullDate}>
        {stringifyDate(post.publishDate)}
      </span>
      &nbsp;
      <a className={classes.link} href={getHashPathname(post.filename)}>
        {post.title}
      </a>
      <Tags
        classes={{ tag: classes.tagsTag }}
        tags={post.tags}
      />
    </div>
  </div>
);

const styles = {
  root: {
    display: 'flex' as 'flex',
    flexDirection: 'row' as 'row',
  },
  date: {
    position: 'relative' as 'relative',
    minWidth: '8em',
    minHeight: 85,
    fontWeight: 300,
    textAlign: 'right' as 'right',
    marginRight: '1em',
    paddingRight: '1em',
    borderRight: '1px solid #c3c8ce',
    '&.with-dot:after': {
      position: 'absolute' as 'absolute',
      content: '""',
      width: 7,
      height: 7,
      right: -5,
      top: 6,
      borderRadius: 100,
      border: '1px solid #c3c8ce',
      backgroundColor: 'white',
    },
    '&.with-dot.color-dot:after': {
      borderColor: 'var(--theme-primary-color, #2980b9)',
      backgroundColor: 'var(--theme-primary-color, #2980b9)',
    },
    '@media(max-width: 700px)': {
      minHeight: 70,
    },
  },
  content: {
    marginRight: 20,
  },
  fullDate: {
    display: 'inline-block' as 'inline-block',
    width: '3em',
    fontWeight: 300,
  },
  link: {
    textTransform: 'uppercase' as 'uppercase',
    fontWeight: 400,
  },
  tagsTag: {
    marginTop: 10,
  },
};

export default withStyles(styles)(Post);
