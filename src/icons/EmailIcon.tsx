import React from 'react';
import ClipboardJS from 'clipboard';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import withStyles from '@material-ui/core/styles/withStyles';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import ClearIcon from '@material-ui/icons/Clear';

import config from '../config';
import classnames from '../classnames';


interface Props {
  classes: any,
}

interface State {
  snackbarOpened: boolean,
}

let clipboard: any = null;

class EmailIcon extends React.Component<Props, State> {
  state: State = {
    snackbarOpened: false,
  }

  openSnackbar = () => {
    this.setState({
      snackbarOpened: true,
    });
  }

  closeSnackbar = () => {
    this.setState({
      snackbarOpened: false,
    });
  }

  componentDidMount() {
    const { email } = config.social;
    if (!email) {
      console.error("Email must be set in murky config");
      return;
    }
    clipboard = new ClipboardJS('.email-button', {
      text: () => (
        `${email[0]}@${email[1]}.${email[2]}`
      ),
    });
  }

  render() {
    const { classes } = this.props;
    const { snackbarOpened } = this.state;

    const snackbarAction = (
      <IconButton
        className={classes.snackbarIcon}
        onClick={this.closeSnackbar}
      >
        <ClearIcon />
      </IconButton>
    );

    return (
      <React.Fragment>
        <button
          className={classnames(classes.button,
                                "email-button")}
          onClick={this.openSnackbar}
        >
          <MailOutlineIcon className={classes.icon} />
        </button>
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          open={snackbarOpened}
          autoHideDuration={6000}
          message="Email copied to clipboard"
          onClose={this.closeSnackbar}
          action={snackbarAction}
        />
      </React.Fragment>
    );
  }
}

const styles = {
  button: {
    position: 'relative' as 'relative',
    border: 'none' as 'none',
    padding: 0,
    outline: 'none' as 'none',
    cursor: 'pointer' as 'pointer',
    '&:hover:after': {
      content: '"Click to copy email to clipboard"',
      position: 'absolute' as 'absolute',
      left: 12,
      bottom: '-2em',
      transform: 'translateX(-50%) translateY(50%)',
      fontSize: 14,
      width: '17em',
      padding: '0.5em 0',
      color: 'white',
      backgroundColor: 'rgba(88, 95, 101, 0.9)',
    },
  },
  icon: {
    color: '#6F6F6F',
    '&:hover': {
      color: 'var(--theme-primary-color, #2980b9)',
    },
  },
  snackbarIcon: {
    color: 'white',
  },
};

export default withStyles(styles)(EmailIcon);
