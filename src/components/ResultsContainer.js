import React, { useState } from 'react';
import {
  makeStyles,
  Container,
  Grid,
  Typography,
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
