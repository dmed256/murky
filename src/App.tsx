import React from 'react';

import MarkdownFetch from './MarkdownFetch';
import history from './history';

interface Props {
}

interface State {
  pathname: string,
}

class App extends React.Component<Props, State> {
  state: State = {
    pathname: location.hash.substr(1) || '/',
  }

  constructor(props: Props) {
    super(props);
  }

  componentDidMount() {
    history.listen(this.onHistoryChange);
  }

  componentWillUnmount() {
    history.unlisten(this.onHistoryChange);
  }

  onHistoryChange = (pathname: string) => {
    if (this.state.pathname !== pathname) {
      this.setState({ pathname });
    }
  }

  render() {
    return (
      <div style={{
        maxWidth: 800,
        padding: '30px 15px 40px',
        margin: '0 auto',
      }}>
        <MarkdownFetch
          pathname={this.state.pathname}
        />
      </div>
    );
  }
};

export default App;
