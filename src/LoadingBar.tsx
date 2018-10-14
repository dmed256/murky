import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import withStyles from '@material-ui/core/styles/withStyles';

import classnames from './classnames';


interface Props {
  classes: any,
  loading: boolean,
}

const LoadingBar = ({ classes, loading }: Props) => (
  <LinearProgress
    className={classnames(classes.root,
                          loading && 'loading')}
    color="secondary"
  />
);

const styles = {
  root: {
    position: 'absolute' as 'absolute',
    opacity: 0,
    top: 0,
    left: 0,
    width: '100%',
    height: 3,
    animation: 'opacity 1s linear',
    '&.loading': {
      opacity: 1,
    },
    '@media print': {
      display: 'none' as 'none',
    },
  },
}

export default withStyles(styles)(LoadingBar);
