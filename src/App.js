import React, { Fragment, useState } from 'react';
import {
  CssBaseline,
  Container,
} from '@material-ui/core';

import TopNav from './components/TopNav';
import ResultsContainer from './components/ResultsContainer';

export default function App() {
  const [searchText, setSearchText] = useState('');

  return (
    <Fragment>
      <CssBaseline />
      <TopNav handleInput={setSearchText} />
      <Container style={{padding: 10}}>
        <ResultsContainer searchText={searchText} />
      </Container>
    </Fragment>
  );
};

