import React from 'react';

import history from './history';

interface Props {
}

interface State {
  pathname: string,
}

class App extends React.Component<Props, State> {
  state: State = {
    pathname: location.hash.substr(2) || '/',
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
    console.log({ pathname });
    if (this.state.pathname !== pathname) {
      this.setState({ pathname });
    }
  }

  render() {
    return (
      <div />
    );
  }
};

export default App;
