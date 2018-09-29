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
    <Section title="Interests">
    </Section>
    <Section title="Work Experience">
      <SubSection
        title="Software Engineer at Two Sigma"
        start="August 2015"
        end="Present"
        first
      >
      </SubSection>

      <SubSection
        title="Intern at Shell"
        date="Summer 2014"
      >
      </SubSection>

      <SubSection
        title="Contractor at Shell"
        start="Spring 2014"
        end="Fall 2014"
      >
      </SubSection>

      <SubSection
        title="Intern at Shell"
        date="Summer 2013"
      >
      </SubSection>

      <SubSection
        title="Staff in HPC Summer Institute"
        date="Summer 2012"
      >
      </SubSection>
    </Section>
    <Section title="Education">
      <SubSection
        title="Ph.D. in Computational and Applied Mathematics"
        date="May 2015"
        first
      >
      </SubSection>
      <SubSection
        title="Masters in Computational and Applied Mathematics"
        date="April 2014"
      >
      </SubSection>
      <SubSection
        title="Bachelor of Science in Mathematics"
        date="May 2011"
      >
      </SubSection>
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
    letterSpacing: '0.05em',
  },
}

export default withStyles(styles)(Resume);
