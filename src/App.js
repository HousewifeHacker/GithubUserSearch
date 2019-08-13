import React, { Fragment, useState } from 'react';
import {
    CssBaseline,
} from '@material-ui/core';

import TopNav from './components/TopNav';
import ResultsContainer from './components/ResultsContainer';

export default function App() {
  const [searchText, setSearchText] = useState(null);

  return (
    <Fragment>
      <CssBaseline />
      <TopNav handleInput={setSearchText} />
      <ResultsContainer searchText={searchText} />
    </Fragment>
  );
};

