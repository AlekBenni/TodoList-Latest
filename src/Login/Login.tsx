import React from 'react'
import {Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, TextField, Button, Grid} from '@material-ui/core'
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { loginTC } from './login-reducer';
import { RootStateType } from '../state/store';
import { Redirect } from 'react-router-dom';

export const Login = () => {

    const dispatch = useDispatch()
    const isLogin = useSelector<RootStateType>((state) => state.login.isLoginIn)

    const red = {
        color: 'red',
        fontWeight: 700
    }

    const formik = useFormik({
        initialValues: {
          email: 'Enter email',
          password: '',
          rememberMe: false
        },
        onSubmit: values => {
          console.log(values.email)
          console.log(values.password)
          console.log(values.rememberMe)
          dispatch(loginTC(values))
        },
        validate: values => {
            let errors:any = {}

            if(!values.email){
                errors.email = 'Name is Required!'
            }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
                errors.email = 'Email is invalid!'
            }

            if(!values.password){
                errors.password = 'Password is here!'
            }
            return errors
        }      
      });

      if(isLogin){ return <Redirect to = {'/'} /> }

   return <Grid container justify="center">
       <Grid item xs={3}>
           <FormControl>
           <form onSubmit={formik.handleSubmit}>
               <FormLabel>
                   <p>To log in get registered 
                     <a href={'https://social-network.samuraijs.com/'}
                        target={'_blank'}>here
                     </a>
                   </p>
                   <p>or use common test account credentials:</p>
                   <p>Email: free@samuraijs.com</p>
                   <p>Password: free</p>
               </FormLabel>
               <FormGroup>
                   <TextField
                       label="Email"
                       margin="normal"
                       name="email"
                       onChange={formik.handleChange}
                   />
                   {formik.errors.email ? <div style={red}>{formik.errors.email}</div> : null}
                   <TextField
                       type="password"
                       label="Password"
                       margin="normal"
                       name="password"
                       onChange={formik.handleChange}
                   />
                   {formik.errors.password ? <div style={red}>{formik.errors.password}</div> : null}
                   <FormControlLabel
                       label={'Remember me'}
                       control={<Checkbox />}
                       name="rememberMe"
                       onChange={formik.handleChange}
                   />
                   <Button type={'submit'} variant={'contained'} color={'primary'}>Login</Button>
               </FormGroup>
               </form>
           </FormControl>
       </Grid>
   </Grid>
}
