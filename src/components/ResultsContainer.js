import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import debounce from 'lodash.debounce';
import {
  makeStyles,
  Container,
  Grid,
} from '@material-ui/core';

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

export default function ResultsContainer(props) {
  const classes = useStyles();
  const [results, setResults] = useState(testList); 

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

  const items = results.map((item) => {
    return (
      <Result
        avatar={item.avatar_url}
        bigAvatar={classes.bigAvatar}
        login={item.login}
        url={item.url}
        key={item.id} />
    )
  });
  return (
    <Container style={{padding: 20}}>
      <Grid container justify="center" alignItems="center" spacing={3}>
        {items}
      </Grid>
    </Container>
  );
};
