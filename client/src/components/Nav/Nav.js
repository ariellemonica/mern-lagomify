import React, {useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
// import { Link } from 'react-router-dom';
import {authContext} from '../../utils/appContext';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }

}));

export default function ButtonAppBar () {
  const classes = useStyles();
  const {user} = useContext(authContext);

  const handleLogout = () => {
    localStorage.clear("google_token");
    window.location.reload()
  }
  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ backgroundColor: '#000' }}>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
              Lagomify
          </Typography>
          <Button color="inherit" href="/">Home</Button>
          <Button color="inherit" href="/member">Account</Button>
          <Button color="inherit" href="/items">My Items</Button>
          <Button color="inherit" href="/more">Learn More</Button>
          {user ? <Button onClick={handleLogout} color="inherit" href="#">Log Out</Button> : ""}
        </Toolbar>
      </AppBar>
    </div>
  );
}
