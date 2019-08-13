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
    border: '2px solid grey',
    boxShadow: theme.shadows[1],
  }
}));


export default function DetailsModal(props) {
  const classes = useStyles();

  const [userInfo, setUserInfo] = useState(null);
  // would be used to display error in UI
  //const [errors, setErrors] = useState(null);

  useEffect(() => {
    !userInfo && fetchData();
  });

  async function fetchData() {
    try {
      const res = await axios.get(props.api);
      setUserInfo(res.data);
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
