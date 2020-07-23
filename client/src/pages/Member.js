import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { authContext } from '../utils/appContext';
import ItemAdd from '../pages/ItemAdd';

// NOTE: the user? div around the imported pages/components is necessary because we don't want them to load before authentication is done

const useStyles = makeStyles((theme) => ({
  greeting: {
    fontWeight: 'bold',
    marginRight: theme.spacing(4)
  },
  username: {
    // ...theme.typography.button,
    // color: '#d29291'
    color: '#115293'
  }
}));

export default () => {
  const { user, loading } = useContext(authContext);
  const classes = useStyles();

  // DEBUG:
  console.log(user, loading);

  return (
    <>
      <Typography variant="body1"
        align="right"
        className={classes.greeting}>
        Hi, <span className={classes.username}>{user?.name}</span>!
      </Typography>
      { user
        ? <Typography variant="body1">
          <ItemAdd user={user || 'Guest'}/>
        </Typography>
        : <Typography variant="body1">
          Loading user information ...
        </Typography>}
    </>
  );
};
