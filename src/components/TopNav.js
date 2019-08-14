import React, {useRef} from 'react';
import {
  AppBar,
  Button,
  InputBase,
  Toolbar,
  Typography,
} from '@material-ui/core';
import {
  Search as SearchIcon
} from '@material-ui/icons';
import { fade, makeStyles } from '@material-ui/core/styles';
import debounce from 'lodash.debounce';

// following example in Material UI https://material-ui.com/components/app-bar/
const useStyles = makeStyles(theme => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 300,
    },
  },
  flexGrow: {
    flexGrow: 1,
  }
}));


export default function TopNav(props) {
  const classes = useStyles();
  const delayedSearch = useRef(
      debounce(value => props.handleInput(value), 700)
  ).current;
  return (
    <AppBar position="static"> 
      <Toolbar>
        <Typography variant="h6" color="inherit" noWrap>
          Github User Search
        </Typography>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
             placeholder="Search…"
             classes={{
               root: classes.inputRoot,
               input: classes.inputInput,
             }}
             onChange={e => delayedSearch(e.target.value)}
             inputProps={{ 'aria-label': 'search' }}
          />
        </div>
        <div className={classes.flexGrow} />
        <Button
          variant="contained"
          href="https://github.com/HousewifeHacker/GithubUserSearch"
          target="_blank"
        >
          View Repo
        </Button>
      </Toolbar>
    </AppBar>
  )
};
