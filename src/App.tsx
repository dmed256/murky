import React from 'react';

import MarkdownFetch from './MarkdownFetch';
import Theme from './Theme';
import history, { HashPath } from './history';


class App extends React.Component {
  componentDidMount() {
    history.listen(this.onHistoryChange);
  }

  componentWillUnmount() {
    history.unlisten(this.onHistoryChange);
  }

  onHistoryChange = ({ pathname, hash }: HashPath) => {
    this.forceUpdate();
  }

  render() {
    const { pathname, hash } = history;
    return (
      <div style={{
        maxWidth: 800,
        padding: '30px 15px 40px',
        margin: '0 auto',
      }}>
        <Theme>
          <MarkdownFetch
            pathname={pathname}
            hash={hash}
          />
        </Theme>
      </div>
    );
  }
};

export default App;
