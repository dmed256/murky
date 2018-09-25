import React from 'react';
import jump from 'jump.js';
import withStyles from '@material-ui/core/styles/withStyles';

// import LandingPage from './LandingPage';
import MarkdownFetch from './MarkdownFetch';
import Theme from './Theme';
import history, { HashPath } from './history';


interface Props {
  classes: any,
}

class App extends React.Component<Props> {
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
    const { classes } = this.props;
    const { pathname, hash } = history;
    return (
      <div className={classes.root}>
        <Theme>
          <MarkdownFetch
            pathname={pathname}
            hash={hash}
          />
          {/*<LandingPage />*/}
        </Theme>
      </div>
    );
  }
};

const styles = {
  root: {
    maxWidth: 800,
    padding: '30px 15px 40px',
    margin: '0 auto',
  },
};

export default withStyles(styles)(App);
