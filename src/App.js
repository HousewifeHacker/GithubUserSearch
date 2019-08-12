import React, { Fragment } from 'react';
import logo from './logo.svg';
import {
    CssBaseline,
    withStyles,
} from '@material-ui/core';

import TopNav from './components/TopNav';

const styles = theme => ({
  grow: {
    flexGrow: 1,
  }
});

function App({ classes }) {
  return (
    <Fragment>
      <CssBaseline />
        <TopNav className={classes.grow}/>
    </Fragment>
  );
}

export default withStyles(styles)(App);
