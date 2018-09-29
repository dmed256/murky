import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';

import Tokens from '../../Tokens';
import * as types from '../../types';
import Header from './Header';

interface Props {
  classes: any,
  tokens: types.Token[],
}

const Resume = ({ classes, tokens }: Props) => (
  <div className={classes.root}>
    <Header />
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

const ResumeWithStyles = withStyles(styles)(Resume);

export const plugin = {
  name: 'resume',
  Component: ResumeWithStyles,
  requiredProps: [],
  optionalProps: [],
  varArgs: false,
};

export default ResumeWithStyles;
