import React from 'react';
import {
  Tabs,
  Tab,
} from '@material-ui/core';

import * as types from '../../types';
import {
  getTabs,
  listen,
  unlisten,
  onTabChange,
} from './utils';


interface Props {
  namespace: string,
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

  componentDidMount() {
    listen(this.props.namespace, this.onChange);
  }

  componentWillUnMount() {
    unlisten(this.props.namespace, this.onChange);
  }

  onChange = (tab: number) => {
    this.setState({ tab });
  }

  render() {
    const { namespace } = this.props;
    const { tab } = this.state;

    if (!this.tabs) {
      return null;
    }

    return (
      <React.Fragment>
        <Tabs
          value={tab}
          indicatorColor="primary"
          onChange={onTabChange(namespace)}
        >
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