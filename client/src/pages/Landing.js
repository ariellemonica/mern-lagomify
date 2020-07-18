import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { GoogleLogin } from 'react-google-login';


const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
console.log(CLIENT_ID);

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
    buttonStyle : {
      backgroundColor: "rgb(255, 255, 255)", 
      display: "inline-flex", 
      alignItems: "center", 
      color: "rgba(0, 0, 0, 0.54)", 
      boxShadow: "rgba(0, 0, 0, 0.24) 0px 2px 2px 0px, rgba(0, 0, 0, 0.24) 0px 0px 1px 0px", 
      padding: "9px", 
      borderRadius: "2px", 
      border: "1px solid transparent", 
      fontSize: "14px", 
      fontWeight: "500", 
      fontFamily: "Roboto, sans-serif" 
    },
  },
}));

export default ({setUser}) => {
    const classes = useStyles();
  
    const responseGoogle = (response) => {
        console.log(response);
        

        fetch('/auth/user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + response.tokenId
          },
          body: JSON.stringify({ googleId: response.profileObj.googleId })
        }).then((res) => {
          console.log(res.status)

          if (res.status === 200) {
            // all is well
            localStorage.setItem("google_token", JSON.stringify(response.tokenId));
            setUser(response.profileObj);
            window.location.replace('/member')
          } else {
            console.log('Unauthorized access.');
            
          }
        });     
      }
    
      const handleFailure = res => console.log("google auth failed - ", res)
    return (
      <div className={classes.root} style={{ textAlign: "center", marginTop: "10em" }}>
      <div style={{ display: "inline-block" }}></div>
      <h1>Welcome to Lagomify</h1>
      <GoogleLogin 
    clientId="970863529024-kjrcmg8234d1ddve9rf3p4icpsrico0n.apps.googleusercontent.com"
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
    );
  }