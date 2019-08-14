import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import debounce from 'lodash.debounce';
import {
  makeStyles,
  Button,
  Container,
  Grid,
} from '@material-ui/core';
import {
  ArrowBackIos as BackIcon,
  ArrowForwardIos as ForwardIcon,
} from '@material-ui/icons';

import Result from './Result';

const useStyles = makeStyles({
  bigAvatar: {
    margin: "auto",
    width: 140,
    height: 140,
  },
});

const testList = [
  {
    "login": 'john',
    "id": 1668,
    "avatar_url": "https://avatars1.githubusercontent.com/u/1668?v=4",
    "url": "https://api.github.com/users/john",
  }
]

const PAGE_LIMIT = 20;

export default function ResultsContainer(props) {
  const classes = useStyles();
  const [results, setResults] = useState(testList); 
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    props.searchText && fetchData();
  });

  async function fetchData() {
    try {
      const apiBaseURL = "https://api.github.com/search/users?q=";
      const res = await axios.get(`${apiBaseURL}${props.searchText}`);
      console.log('fetching');
      setResults(res.data.items);
    } catch(err) {
      console.log(err);
    }
  }

  const renderItems = () => {
    let paginatedResults = results.slice(currentPage*PAGE_LIMIT, (currentPage+1)*PAGE_LIMIT);
    console.log(paginatedResults);
    return paginatedResults.map((item) => {
      return (
        <Result
          avatar={item.avatar_url}
          bigAvatar={classes.bigAvatar}
          login={item.login}
          url={item.url}
          key={item.id} />
      )
    });
  };

  const renderPagination = () => {
    let totalCount = results.length;
    let maxPage = Math.ceil(totalCount/PAGE_LIMIT)-1;
    let showStr = `Showing ${currentPage*PAGE_LIMIT+1} - ${Math.min((currentPage+1)*PAGE_LIMIT, totalCount)} of ${totalCount}`;
    return (
      <div align="right">
        {showStr}
        <Button onClick={() => setCurrentPage(Math.max(0, currentPage-1))}>
          <BackIcon />
        </Button>
        <Button onClick={() => setCurrentPage(Math.min(maxPage, currentPage+1))}>
          <ForwardIcon />
        </Button>
      </div>
    )
  };
  
  return (
    <Container style={{padding: 20}}>
      <Grid container justify="center" alignItems="center" spacing={3}>
        {renderItems()}
      </Grid>
      {renderPagination()}
    </Container>
  );
};
