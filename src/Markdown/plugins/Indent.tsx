import React from 'react';
import { withStyles } from '@material-ui/core';

import Token from '../Token';
import * as types from '../types';

interface Props {
  classes: any,
  children: types.Token[],
}

const Indent = ({ classes, children }: Props) => (
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
    margin: '0 10px',
    paddingLeft: 10,
    borderLeft: '1px solid #dadada',
    fontWeight: 300,
  },
};

export default withStyles(styles)(Indent);
