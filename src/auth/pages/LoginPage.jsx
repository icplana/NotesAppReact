import { useDispatch, useSelector } from 'react-redux'

import { Link as RouterLink } from 'react-router-dom'

import { Typography, TextField, Grid, Button, Link, Alert } from "@mui/material"
import GoogleIcon from '@mui/icons-material/Google';

import { AuthLayout } from "../layout/AuthLayout"; 
import { useForm } from '../../hooks'
import { checkingAuthentication, startEmailSignIn, startGoogleSignIn } from '../../store/auth'
import { useMemo } from 'react';


const formData =  {
  email: '',
  password: ''
}

export const LoginPage = () => {
  
  const dispatch = useDispatch()

  const { status, errorMessage } = useSelector( state => state.auth )

  const { email, password, onInputChange} = useForm( formData )

  const isAuthenticating = useMemo( () => status === 'checking', [status] )


  const onSubmit = ( event ) => {
    event.preventDefault()
    console.log({ email, password })
    
    
    dispatch( startEmailSignIn( email, password ) )
  }


  const onGoogleSignIn = () => {
    console.log('googlesignin')

    dispatch( startGoogleSignIn() )
  }



  return (
    <AuthLayout title="Login">

        <form aria-label='submit-form' onSubmit = { onSubmit } className="animate__animated animate__fadeIn animate__faster">
          <Grid container>

            <Grid item xs={ 12 } sx= {{ mt: 2 }}>
              <TextField 
                label= "Correo" 
                type="email" 
                placeholder="correo@correo.com"
                fullWidth
                name= 'email'
                value = { email }
                onChange = { onInputChange } 
              ></TextField>
            </Grid>

            <Grid item xs={ 12 } sx= {{ mt: 2 }}>
              <TextField 
                label= "Contraseña" 
                type="password" 
                placeholder="contraseña"
                fullWidth
                name= 'password'
                value = { password }
                inputProps={{
                  'data-testid': 'password'
                }}
                onChange = { onInputChange }
              ></TextField>
            </Grid>            

            <Grid container spacing= { 2 } sx={{ mb: 2, mt: 1 }} >

              <Grid item xs={ 12 } sm={ 6 }>
                <Button 
                  disabled={ isAuthenticating } 
                  type='submit' 
                  variant="contained" 
                  fullWidth
                >Login</Button>                
              </Grid>
              

              <Grid item xs={ 12 } sm={ 6 }>
                <Button 
                  disabled={ isAuthenticating } 
                  onClick = { onGoogleSignIn } 
                  variant="contained" 
                  fullWidth
                  aria-label='google-btn'
                >
                  <GoogleIcon/>
                  <Typography sx={{ ml: 1 }}>Google</Typography>
                </Button>                
              </Grid>

            </Grid>

            <Grid display={ !!errorMessage ? '' :'none'}>
              <Alert severity='error'>{ errorMessage }</Alert>
            </Grid>

            <Grid container direction="row" justifyContent="end">
              <Link component={ RouterLink } color='inherit' to='/auth/register'>
                Crear una cuenta
              </Link>
            </Grid>


          </Grid>
        </form>
      </AuthLayout>
  )
}
