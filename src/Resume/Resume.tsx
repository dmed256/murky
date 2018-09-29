import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';

import Header from './Header';
import Section from './Section';
import SubSection from './SubSection';


interface Props {
  classes: any,
}

const Resume = ({ classes }: Props) => (
  <div className={classes.root}>
    <Header />
    <Section title="Work Experience">
      <SubSection>
      </SubSection>
    </Section>
    <Section title="Interests">
    </Section>
    <Section title="Education">
    </Section>
    <Section title="Publications">
    </Section>
    <Section title="Talks">
    </Section>
    <Section title="Projects">
    </Section>
    <Section title="Awards">
    </Section>
  </div>
);

const styles = {
  root: {
    '@media print': {
      margin: '15px 30px',
    },
  },
}

export default withStyles(styles)(Resume);
