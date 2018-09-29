import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';


interface Props {
  classes: any,
  children?: any,
  title?: string,
  date?: string,
  start?: string,
  end?: string,
}

const SubSection = ({
  classes,
  children,
  title,
  date,
  start,
  end,
}: Props) => (
  <div className={classes.root}>
    <div className={classes.date}>
      <div>{date || start}</div>
      <div>{end}</div>
    </div>
    <div className={classes.content}>
      <div className="title">
        {title}
      </div>
      <div className="description">
        {children}
      </div>
    </div>
  </div>
);

const styles = {
  root: {
    display: 'flex',
    marginTop: 24,
    lineHeight: '1.5em',
    '&:first-child': {
      marginTop: 0,
    },
    '@media print': {
      fontSize: 13,
    },
  },
  date: {
    fontWeight: 100,
    width: 100,
    marginRight: 20,
    textAlign: 'right' as 'right',
    '@media print': {
      width: 80,
    },
  },
  content: {
    flex: 1,
    '& .title': {
      fontWeight: 600,
    },
    '& .description': {
      fontWeight: 300,
    },
  },
}

export default withStyles(styles)(SubSection);
