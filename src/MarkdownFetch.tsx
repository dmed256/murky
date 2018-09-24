import React from 'react';

import ErrorPage from './ErrorPage';
import Markdown from './Markdown';
import config from './config';


type FetchState = 'loading' | 'error' | 'data';

interface Props {
  pathname: string,
  hash: string,
}

interface State {
  fetchState: FetchState;
  content: any;
}

class MarkdownFetch extends React.Component<Props, State> {
  state: State = {
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

    if (pathname !== this.props.pathname) {
      this.setState({
        content: undefined,
      });
      fetch(pathname)
        .then((res) => {
          const text = res.text();
          if (res.ok) {
            return text;
          }
          return text.then((t) => Promise.reject(t));
        })
        .then((content) => {
          if (this.props.pathname === newPathname) {
            this.setState({
              fetchState: 'data',
              content,
            });
          }
        })
        .catch(() => {
          if (this.props.pathname === newPathname) {
            this.setState({
              fetchState: 'error',
            });
          }
        })
    }
  }

  componentDidMount() {
    this.fetchContent();
  }

  shouldComponentUpdate(nextProps: Props, nextState: State) {
    return (
      (this.props.pathname !== nextProps.pathname) ||
      (this.state.content !== nextState.content)
    );
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.pathname !== prevProps.pathname) {
      this.fetchContent();
    }
  }

  render() {
    const { fetchState, content } = this.state;
    switch (fetchState) {
      case 'loading':
        return null;
      case 'error':
        return (
          <ErrorPage pathname={this.props.pathname} />
        );
      default:
        return (
          <Markdown content={content || ''} />
        );
    }
  }
};

export default MarkdownFetch;
