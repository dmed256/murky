import React from 'react';

import ErrorPage from './ErrorPage';
import Markdown from './Markdown';
import LoadingBar from './LoadingBar';
import config from './config';


type FetchState = 'loading' | 'error' | 'data';

interface Props {
  pathname: string,
  hash: string,
}

interface State {
  pathname: string,
  fetchState: FetchState;
  content: any;
}

class MarkdownFetch extends React.Component<Props, State> {
  state: State = {
    pathname: '',
    fetchState: 'loading',
    content: undefined,
  }

  fetchContent = () => {
    let { pathname } = this.props;
    const newPathname = pathname;

    if (pathname.startsWith('/')) {
      pathname = `${config.root}${pathname}`
    }
    if (pathname.endsWith('/')) {
      pathname += 'index.md';
    } else {
      pathname += '.md';
    }

    if (pathname === this.props.pathname) {
      return;
    }

    this.setState({
      fetchState: 'loading',
    });
    fetch(pathname)
      .then((res) => {
        const text = res.text();
        if (res.ok) {
          return text;
        }
        return Promise.reject(text);
      })
      .then((content) => {
        if (this.props.pathname === newPathname) {
          this.setState({
            pathname,
            fetchState: 'data',
            content,
          });
        }
      })
      .catch(() => {
        if (this.props.pathname === newPathname) {
          this.setState({
            pathname,
            fetchState: 'error',
            content: undefined,
          });
        }
      });
  }

  componentDidMount() {
    this.fetchContent();
  }

  shouldComponentUpdate(nextProps: Props, nextState: State) {
    return (
      (this.props.pathname !== nextProps.pathname)
        || (this.state.pathname !== nextState.pathname)
        || (this.state.content !== nextState.content)
        || (this.state.fetchState !== nextState.fetchState)
    );
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.pathname !== prevProps.pathname) {
      this.fetchContent();
    }
  }

  render() {
    const {
      pathname,
      fetchState,
      content,
    } = this.state;

    const body = (
      (fetchState !== 'error')
        ? <Markdown content={content || ''} />
        : <ErrorPage pathname={pathname} />
    );

    return (
      <React.Fragment>
        <LoadingBar loading={fetchState === 'loading'} />
        {body}
      </React.Fragment>
    );
  }
};

export default MarkdownFetch;
