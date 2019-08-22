import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  makeStyles,
  Avatar,
  Button,
  Paper,
  Typography,
} from '@material-ui/core';

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
    padding: 20,
  }
}));


function DetailsModal(props) {
  const classes = useStyles();

  const [userInfo, setUserInfo] = useState(null);
  // would be used to display error in UI
  //const [errors, setErrors] = useState(null);

  useEffect(() => {
    !userInfo && fetchData();
  });

  async function fetchData() {
    try {
      const apiBaseURL = "https://api.github.com/graphql";
      const body = {
        query: `
          query {
            user(login:"${props.login}") {
              location
              name
              followers {
                totalCount
              }
              repositories {
                totalCount
              }
              url
              avatarUrl
            }
          }
        `
      };
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `bearer ${process.env.REACT_APP_GITHUB_TOKEN}`
        }
      };
      const res = await axios.post(apiBaseURL, body, config);
      setUserInfo(res.data.data.user);
    } catch (err) {
      //setErrors(err);
      console.log(err);
    }
  }

  if (!userInfo) {
    return (<div>Waiting</div>);
  }

  return (
    <Paper className={classes.modal}>
      <Typography variant="h4" align="center">
          {props.login}
      </Typography>
      <Avatar src={userInfo.avatarUrl} className={classes.avatar} />
      <div style={{padding:20}}>
        Name: {userInfo.name} <br />
        Location: {userInfo.location} <br />
        Followers: {userInfo.followers.totalCount} <br />
        Repos: {userInfo.repositories.totalCount} <br />
      </div>
      <div align="center">
        <Button
          href={userInfo.url}
          target="_blank"
          variant="contained"
          color="primary">
            View Profile
        </Button>
      </div>
    </Paper>
  )
};

const FinalModal = React.forwardRef((props, ref) => {
    return <DetailsModal {...props} forwardedRef={ref} />;
});


export default FinalModal;
