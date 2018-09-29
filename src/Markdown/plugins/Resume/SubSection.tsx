import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';

import classnames from '../../../classnames';
import Tokens from '../../Tokens';
import * as types from '../../types';

interface Props {
  classes: any,
  tokens: types.Token[],
  title: string,
  date?: string,
  start?: string,
  end?: string,
}

const SubSection = ({
  classes,
  tokens,
  title,
  date,
  start,
  end,
}: Props) => (
  <div className={classes.root}>
    <div className={classnames(classes.date, 'subsection-date')}>
      <div>{date || start}</div>
      <div>{end}</div>
      <div className={classnames('dot', (end === 'Present') && 'present')} />
    </div>
    <div className={classes.content}>
      <div className="title">
        {title}
      </div>
      <div className="description">
        <Tokens tokens={tokens} />
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
    position: 'relative' as 'relative',
    width: 100,
    marginRight: 14,
    paddingRight: 14,
    marginTop: -24,
    paddingTop: 24,
    borderRight: '1px solid #c3c8ce',
    fontWeight: 100,
    textAlign: 'right' as 'right',
    '& .dot': {
      position: 'absolute' as 'absolute',
      width: 7,
      height: 7,
      right: -5,
      top: 31,
      borderRadius: 100,
      border: '1px solid #c3c8ce',
      backgroundColor: 'white',
      '&.present': {
        borderColor: 'var(--theme-primary-color, #2980b9)',
        backgroundColor: 'var(--theme-primary-color, #2980b9)',
      },
    },
    '@media print': {
      width: 80,
      '& .dot.present': {
        borderColor: '#c3c8ce !important',
        backgroundColor: 'white !important',
      },
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

const SubSectionWithStyles = withStyles(styles)(SubSection);

export const plugin = {
  name: 'resume-subsection',
  Component: SubSectionWithStyles,
  requiredProps: ['title'],
  optionalProps: ['date', 'start', 'end'],
  varArgs: false,
};

export default SubSectionWithStyles;
