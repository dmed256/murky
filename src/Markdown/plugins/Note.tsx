import React from 'react';
import { withStyles } from '@material-ui/core';

import Tokens from '../Tokens';
import * as types from '../types';

interface Props {
  classes: any,
  tokens: types.Token[],
}

const Note = ({ classes, tokens }: Props) => (
  <div className={classes.root}>
    <Tokens tokens={tokens} />
  </div>
);

const styles = {
  root: {
    margin: 32,
    padding: '0 1.5em',
    border: '1px solid #f9a753',
  },
};

export default withStyles(styles)(Note);
