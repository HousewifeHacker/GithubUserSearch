import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/styles';
import {
  Button,
  Container,
  Grid,
} from '@material-ui/core';
import {
  ArrowBackIos as BackIcon,
  ArrowForwardIos as ForwardIcon,
} from '@material-ui/icons';
import axios from 'axios';

import Result from './Result';

const styles = theme => ({
  bigAvatar: {
    margin: "auto",
    width: 140,
    height: 140,
    padding: 10,
  },
});

const PAGE_LIMIT = 20;
const TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

class ResultsContainer extends Component {
  initialState = {
    totalUsers: null,
    currentPage: 0,
    results: [],
    isLoading: false,
    pageInfo: null,
  };
  state = this.initialState;
  classes = this.props.classes;

  // changed searchTerm
  componentDidUpdate(prevProps) {
    if (this.props.searchText !== prevProps.searchText){
      if (this.props.searchText.length) {
        this.fetchData();
      } else {
        this.setState(this.initialState);
      }
    }
  }

  fetchData = async (paginationStr=`first: ${PAGE_LIMIT}`) => {
    this.setState({isLoading: true});
    let searchText = this.props.searchText;
    try {
      const apiBaseURL = "https://api.github.com/graphql";
      const body = {
        query: `
          query searchUsers {
            search(type: USER, query: "${searchText}" ${paginationStr}) {
              userCount
              pageInfo {
                endCursor
                startCursor
                hasNextPage
                hasPreviousPage
              }
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
      console.log(res);
      let data = res.data.data.search;
      this.setState({
        totalUsers: data.userCount,
        results: data.nodes,
        pageInfo: data.pageInfo,
        isLoading: false,
      });
    } catch(err) {
      console.log(err);
      this.setState(this.initialState);
    }
  };

  renderItems = () => {
    return this.state.results.map((item) => {
      return (
        <Result
          avatar={item.avatarUrl}
          bigAvatar={this.classes.bigAvatar}
          login={item.login}
          key={item.id} />
      )
    });
  };

  increaseCurrentPage = () => {
    if (!this.state.pageInfo.hasNextPage) { return }
    this.setState((state) => ({
      currentPage: state.currentPage + 1
    }));
    let paginationStr = `first: ${PAGE_LIMIT} after: ${this.state.pageInfo.endCursor}`;
    this.fetchData(paginationStr);
  }
  
  decreaseCurrentPage = () => {
    if (!this.state.pageInfo.hasPreviousPage) { return }
    this.setState((state) => ({
      currentPage: state.currentPage - 1
    }));
    let paginationStr = `last: ${PAGE_LIMIT} before: ${this.state.pageInfo.startCursor}`;
    this.fetchData(paginationStr);
  }

  renderPagination = () => {
    let totalCount = this.state.totalUsers;
    let currentPage = this.state.currentPage;
    let showStr = `Showing ${currentPage*PAGE_LIMIT+1} - ${Math.min((currentPage+1)*PAGE_LIMIT, totalCount)} of ${totalCount}`;
    if (!totalCount) { return }
    let increaseCurrentPage = this.increaseCurrentPage;
    let decreaseCurrentPage = this.decreaseCurrentPage;
    return (
      <div align="right">
        {showStr}
        <Button onClick={() => decreaseCurrentPage()}>
          <BackIcon />
        </Button>
        <Button onClick={() => increaseCurrentPage()}>
          <ForwardIcon />
        </Button>
      </div>
    )
  };
 
  render() {
    if (!this.props.searchText.length) { return <h2>Search for Github Users</h2> }
    if (this.state.isLoading) { return <h2>Loading ...</h2> }
    if (!this.state.results.length) { return <h2>No results</h2> }
    return (
      <Container style={{padding: 20}}>
        <Fragment>
          {this.renderPagination()}
          <Grid container justify="center" alignItems="center" spacing={3}>
            {this.renderItems()}
          </Grid>
          {this.renderPagination()}
        </Fragment>
      </Container>
    );
  };
};

export default withStyles(styles)(ResultsContainer);
