import React from 'react';
import {
  Tabs,
  Tab,
} from '@material-ui/core';

import * as types from '../../types';
import { getTabs } from './utils';


interface Props {
  children: types.Token[],
}

interface State {
  tab: number;
}

class MarkdownTabs extends React.Component<Props, State> {
  state: State = {
    tab: 0,
  }

  tabs = getTabs(this.props.children);

  onChange = (event: any, tab: number) => {
    this.setState({ tab });
  }

  render() {
    const { tab } = this.state;

    if (!this.tabs) {
      return null;
    }

    return (
      <React.Fragment>
        <Tabs value={tab} onChange={this.onChange}>
          {
            this.tabs.map(({ label }) => (
              <Tab key={label} label={label} />
            ))
          }
        </Tabs>
        {this.tabs[tab].content}
      </React.Fragment>
    );
  }
};


export default MarkdownTabs;
