import React from 'react';

import Header from './Header';
import Section from './Section';
import SubSection from './SubSection';


const Resume = () => (
  <React.Fragment>
    <Header />
    <Section title="Interests">
    </Section>
    <Section title="Work Experience">
      <SubSection
        title="Software Engineer at Two Sigma"
        start="August 2015"
        end="Present"
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
  </React.Fragment>
);

export default Resume;
