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
  link?: null,
}

interface State {
  snackbarOpened: boolean,
}

class EmailIcon extends React.Component<Props, State> {
  clipboard: any = null;

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
    const { fullEmail } = config.social;
    if (!fullEmail) {
      throw Error("Email must be set in murky config");
    }
    this.clipboard = new ClipboardJS('.email-button', {
      text: () => fullEmail,
    });
  }

  render() {
    const { classes, link } = this.props;
    const { snackbarOpened } = this.state;

    const icon = (
      <MailOutlineIcon className={classes.icon}/>
    );
    if (link === null) {
      return icon;
    }

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
          {icon}
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
    color: '#6F6F6F',
    backgroundColor: 'inherit',
    cursor: 'pointer' as 'pointer',
    transition: 'color 500ms',
    transitionDelay: '200ms',
    '&:hover': {
      color: 'var(--theme-primary-color, #2980b9)',
      transition: 'color 200ms',
    },
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
    transition: 'color 350ms',
    '&:hover': {
      color: 'var(--theme-primary-color, #2980b9)',
    },
  },
  snackbarIcon: {
    color: 'white',
  },
};

export default withStyles(styles)(EmailIcon);
