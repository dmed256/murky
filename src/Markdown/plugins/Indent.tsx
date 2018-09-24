import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';

import Tokens from '../Tokens';
import * as types from '../types';

interface Props {
  classes: any,
  tokens: types.Token[],
}

const Indent = ({ classes, tokens }: Props) => (
  <div className={classes.root}>
    <Tokens tokens={tokens} />
  </div>
);

const styles = {
  root: {
    margin: '0 10px',
    paddingLeft: 10,
    borderLeft: '1px solid #dadada',
    fontWeight: 300,
  },
};

export default withStyles(styles)(Indent);
