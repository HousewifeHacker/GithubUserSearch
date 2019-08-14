import React, { useState} from 'react';
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
    padding: 10,
  },
});

const PAGE_LIMIT = 20;

export default function ResultsContainer(props) {
  const classes = useStyles();
  const [currentPage, setCurrentPage] = useState(0);
  const {results} = props;
  const renderItems = () => {
    let paginatedResults = results.slice(currentPage*PAGE_LIMIT, (currentPage+1)*PAGE_LIMIT);
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
    if (!totalCount) { return }
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
      {renderPagination()}
      <Grid container justify="center" alignItems="center" spacing={3}>
        {renderItems()}
      </Grid>
      {renderPagination()}
    </Container>
  );
};
