import React from 'react';
import { withStyles } from '@material-ui/core';

import Token from '../Token';
import * as types from '../types';

interface Props {
  classes: any,
  children: types.Token[],
}

const Note = ({ classes, children }: Props) => (
  <div className={classes.root}>
    {
      children.map((token, index) => (
        <Token key={index} token={token} />
      ))
    }
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
