import React, {useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { GoogleLogin } from 'react-google-login';
import { Redirect } from 'react-router-dom';
import {authContext} from '../utils/appContext'

const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
console.log(CLIENT_ID);

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1)
    },
  }
}));

export default ({ setUser }) => {
  const classes = useStyles();
  const {user,loading} = useContext(authContext)
  const responseGoogle = (response) => {
    console.log(response);

    fetch('/auth/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + response.tokenId
      },
      body: JSON.stringify({ googleId: response.profileObj.googleId })
    }).then((res) => {
      console.log(res.status);

      if (res.status === 200) {
        // all is well
        localStorage.setItem('google_token', JSON.stringify(response.tokenId));
        setUser(response.profileObj);
        window.location.replace('/member');
      } else {
        console.log('Unauthorized access.');
      }
    });
  };

  const handleFailure = res => console.log('google auth failed - ', res);
  return (
    <>
    { (!user&&!loading) ? ""
    : <Redirect to="/member"/> }
    <div className={classes.root} style={{ textAlign: 'center', marginTop: '10em' }}>
      <div style={{ display: 'inline-block' }}></div>
      <h1>Welcome to Lagomify</h1>
      <GoogleLogin 
    clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
    buttonText="Login with Google"
    onSuccess={responseGoogle}
    onFailure={handleFailure}
    cookiePolicy={'single_host_origin'}
  />
  <div>

  </div>
        <Button className={classes.buttonStyle} variant="contained" color="primary" size="large" href="/signup">
          Create Account
      </Button>
    </div>
    </>
  );
};
