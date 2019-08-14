import React, { Fragment, useState } from 'react';
import {
  CssBaseline,
  Container,
} from '@material-ui/core';

import TopNav from './components/TopNav';
import ResultsContainer from './components/ResultsContainer';
import axios from 'axios';

export default function App() {
  const [results, setResults] = useState([]);
  const [searchText, setSearchText] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchData(searchText) {
    if (searchText) {
      setSearchText(searchText);
      setIsLoading(true);
      try {
        const apiBaseURL = "https://api.github.com/search/users?per_page=100&q=";
        const res = await axios.get(`${apiBaseURL}${searchText}`);
        setResults(res.data.items);
        setIsLoading(false);
      } catch(err) {
        console.log(err);
        setIsLoading(false);
      }
    } else {
      setResults([]);
      setIsLoading(false);
    }
  }

  const renderBody = () => {
    if (isLoading) {
      return <h2>Searching...</h2>
    } else if (results.length === 0 && searchText) {
      return <h2>No users found</h2> 
    } else if (results.length === 0) {
        return <h2> Search for Github Users</h2> 
    } else {
      return <ResultsContainer results={results} />
    }
  }

  return (
    <Fragment>
      <CssBaseline />
      <TopNav handleInput={fetchData} />
      <Container style={{padding: 10}}>
        {renderBody()}
      </Container>
    </Fragment>
  );
};

