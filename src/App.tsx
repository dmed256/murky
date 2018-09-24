import React from 'react';
import jump from 'jump.js';

import MarkdownFetch from './MarkdownFetch';
import Theme from './Theme';
import history, { HashPath } from './history';


class App extends React.Component {
  onHistoryChange = (
    nextHashPath: HashPath,
    prevHashPath: HashPath,
  ) => {
    if (nextHashPath.pathname !== prevHashPath.pathname) {
      this.forceUpdate();
    } else {
      this.scrollToHeader();
    }
  }

  scrollToHeader = () => {
    if (history.hash === history.prev.hash) {
      return;
    }
    const e = document.getElementById(history.hash);
    if (e) {
      jump(e, {
        duration: 500,
      });
    }
  }

  componentDidMount() {
    history.listen(this.onHistoryChange);
    this.scrollToHeader();
  }

  componentWillUnmount() {
    history.unlisten(this.onHistoryChange);
  }

  componentDidUpdate() {
    this.scrollToHeader();
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
