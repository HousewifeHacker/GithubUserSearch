import React, { Fragment, useState } from 'react';
import {
  CssBaseline,
  Container,
} from '@material-ui/core';

import TopNav from './components/TopNav';
import ResultsContainer from './components/ResultsContainer';
import axios from 'axios';

const TOKEN = process.env.REACT_APP_GITHUB_TOKEN

export default function App() {
  const [results, setResults] = useState([]);
  const [searchText, setSearchText] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchData(searchText) {
    if (searchText) {
      setSearchText(searchText);
      setIsLoading(true);
      try {
        const apiBaseURL = "https://api.github.com/graphql";
        const body = {
          query: `
            query searchUsers {
              search(type: USER, first: 100, query: "${searchText}") {
                userCount
                nodes {
                  ... on User {
                    avatarUrl
                    id
                    login
                  }
                }
              }
            }
          `
        };

        const config = {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `bearer ${TOKEN}`
          },
        };
        const res = await axios.post(apiBaseURL, body, config);
        setResults(res.data.data.search.nodes);

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

