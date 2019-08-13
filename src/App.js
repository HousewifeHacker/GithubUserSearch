import React, { Fragment, useState } from 'react';
import logo from './logo.svg';
import {
    CssBaseline,
    withStyles,
} from '@material-ui/core';

import TopNav from './components/TopNav';
import ResultsContainer from './components/ResultsContainer';

const styles = theme => ({
});

const testList = [
  {
    "login": "john",
    "id": 1668,
    "avatar_url": "https://avatars1.githubusercontent.com/u/1668?v=4",
    "url": "https://api.github.com/users/john"
  },
];

function App({ classes }) {
  const [searchText, setSearchText] = useState(null);
  const [results, setResults] = useState(testList);

  return (
    <Fragment>
      <CssBaseline />
      <TopNav handleInput={setSearchText} />
      <ResultsContainer />
    </Fragment>
  );
}

export default withStyles(styles)(App);
