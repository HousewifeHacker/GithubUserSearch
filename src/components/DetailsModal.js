import React, { useState } from 'react';
import {
  makeStyles,
  Avatar,
  Button,
  Paper,
  Typography,
} from '@material-ui/core';

const testData = {
login: "john",
id: 1668,
node_id: "MDQ6VXNlcjE2Njg=",
avatar_url: "https://avatars1.githubusercontent.com/u/1668?v=4",
gravatar_id: "",
url: "https://api.github.com/users/john",
html_url: "https://github.com/john",
followers_url: "https://api.github.com/users/john/followers",
following_url: "https://api.github.com/users/john/following{/other_user}",
gists_url: "https://api.github.com/users/john/gists{/gist_id}",
starred_url: "https://api.github.com/users/john/starred{/owner}{/repo}",
subscriptions_url: "https://api.github.com/users/john/subscriptions",
organizations_url: "https://api.github.com/users/john/orgs",
repos_url: "https://api.github.com/users/john/repos",
events_url: "https://api.github.com/users/john/events{/privacy}",
received_events_url: "https://api.github.com/users/john/received_events",
type: "User",
site_admin: false,
name: "John McGrath",
company: "AWS",
blog: "https://twitter.com/wordie",
location: "San Francisco, CA",
email: null,
hireable: true,
bio: "I'm a solutions architect at AWS and prior to that co-founded Entelo. Interested in renewable energy, media, and democracy.",
public_repos: 51,
public_gists: 1,
followers: 81,
following: 48,
created_at: "2008-02-28T23:17:13Z",
updated_at: "2019-07-11T23:39:50Z"
}

const useStyles = makeStyles(theme => ({
  modal: {
    width: 400,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 4),
    margin: "auto",
  },
    avatar: {
        width: 300,
        height: 300,
        margin: "auto",
        border: '2px solid grey',
        boxShadow: theme.shadows[1],
    }
}));

export default function DetailsModal(props) {
  const classes = useStyles();
  const userInfo = testData;
  return (
    <Paper className={classes.modal}>
      <Typography variant="h4" align="center">
          {userInfo.login}
      </Typography>
          <Avatar src={userInfo.avatar_url} className={classes.avatar} />
      <div style={{padding:20}}>
        Name: {userInfo.name} <br />
        Location: {userInfo.location} <br />
        Followers: {userInfo.followers} <br />
        Repos: {userInfo.public_repos} <br />
      </div>
      <div align="center">
          <Button
      href={userInfo.html_url}
      target="_blank"
      variant="contained"
      color="primary">
          View Profile
        </Button>
      </div>
    </Paper>
  )
};
