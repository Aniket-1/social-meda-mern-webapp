import React, {useState} from 'react';
import useStyles from "./styles";
import {Container, Typography, Avatar, Paper, Grid, Button} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Input from './Input';
import Icon from './Icon'
import { GoogleLogin } from 'react-google-login';
import { useDispatch } from 'react-redux';
import {useHistory} from 'react-router-dom';
import {signin, signup} from '../../actions/auth'

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };
const Auth = () => {

    const [showPassword, setShowPassword] = useState(false);
    const classes = useStyles();
    const [isSignup, setIsSignup ]= useState(false);
    const dispatch = useDispatch();
    const history = useHistory();
    const [form, setForm] = useState(initialState);

    const handleSubmit = (e) =>{
      e.preventDefault()
      if (isSignup) {
        dispatch(signup(form, history));
      } else {
        dispatch(signin(form, history));
      }
    }

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
    const handleShowPassword = () => setShowPassword((prevShowPassword)=> !prevShowPassword)

    const switchMode = () => {
        setIsSignup((prevSignUp=> !prevSignUp));
        setShowPassword(false);
    }

    const googleSuccess = async (res) =>{
        console.log("Successfully Logged In!")
        const result = res?.profileObj;
        const token = res?.tokenId;
        try{
          dispatch({type: 'AUTH', data: {result, token}});
          history.push('/')
        }catch(err){
          console.log(err)
        }
    }
    const googleError = (error) =>{
        console.log("Couldn't Sign In Using Google")
    }
  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">{ isSignup ? 'Sign up' : 'Sign in' }</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            { isSignup && (
            <>
              <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
              <Input name="lastName" label="Last Name" handleChange={handleChange} half />
            </>
            )}
            <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
            { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> }
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            { isSignup ? 'Sign Up' : 'Sign In' }
          </Button>
          <GoogleLogin
            clientId="350846709112-lm1lodu8flhc0c4p91gbp83bti6s1f57.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button 
                className={classes.googleButton} 
                color="primary" fullWidth 
                onClick={renderProps.onClick} 
                disabled={renderProps.disabled}
                startIcon={<Icon />} 
                variant="contained"
              >
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleError}
            cookiePolicy="single_host_origin"
          />
          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                { isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" }
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}

export default Auth