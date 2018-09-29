import React from 'react';
import jump from 'jump.js';

import Layout from './Layout';
import MarkdownFetch from './MarkdownFetch';
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
    setTimeout(() => {
      this.scrollToHeader();
    }, 200);
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
      <Layout>
        <MarkdownFetch
          pathname={pathname}
          hash={hash}
        />
      </Layout>
    );
  }
};


export default App;
