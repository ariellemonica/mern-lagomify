import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { GoogleLogin } from 'react-google-login';
import { Redirect } from 'react-router-dom';
import { authContext } from '../utils/appContext';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1)
    }
  }
}));

export default ({ setUser }) => {
  const classes = useStyles();
  const { user, loading } = useContext(authContext);
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
        window.location.replace('/view');
      } else {
        console.log('Unauthorized access.');
      }
    });
  };

  const handleFailure = res => console.log('google auth failed - ', res);
  return (
    <>
      { (!user && !loading)
        ? ''
        : <Redirect to="/member"/> }
      <div className={classes.root} style={{ textAlign: 'center', marginTop: '10em' }}>
        <div style={{ display: 'inline-block' }}></div>
        <h1>Welcome to Lagomify</h1>
        <GoogleLogin
          // clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          clientId={atob('OTcwODYzNTI5MDI0LWtqcmNtZzgyMzRkMWRkdmU5cmYzcDRpY3BzcmljbzBuLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29t')}
          buttonText="LOGIN WITH GOOGLE"
          onSuccess={responseGoogle}
          onFailure={handleFailure}
          cookiePolicy={'single_host_origin'}
        />
        <div>

        </div>
        <Button variant="contained"
          color="primary"
          size="large"
          href="/signup"
          startIcon={<AccountCircleIcon />}
          className={classes.buttonStyle}>
          Create Account
        </Button>
      </div>
    </>
  );
};
