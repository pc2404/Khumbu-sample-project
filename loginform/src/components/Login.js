import React, { useEffect, useState } from 'react';
import {Formik} from "formik";
import {Box, Button, Paper, Stack, TextField, Typography, styled} from "@mui/material"
import { Lock} from "@mui/icons-material"
import * as yup from "yup";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { setLogin, setAdmin } from '../redux/UserSlice';
import { fetchPolicy, generateRegexExpression } from '../Function/GlobalFunctions';

const Login = () => {
    const [pageType, setPageType]=useState("login");
    const [policyCriteria, setPolicyCriteria]=useState({});
    const isLogin= pageType==="login";
    const isRegister= pageType==="register"
    const dispatch =useDispatch();
    const navigate=useNavigate();
    
    useEffect(()=>{
        fetchPolicy(setPolicyCriteria);
    },[])
    
    const regexpression=generateRegexExpression(policyCriteria.PolicyTemplate);
    // console.log("regexp",regexpression);      
    
    const StyledPaper=styled(Paper)({
        width:"500px",
        borderRadius:"10px",
        backgroundColor:"white",
        padding:"30px",
        position:"absolute",
        top:"50%",
        left:"50%",
        transform:"translate(-50%, -50%)"
        
    })

    const initialValueLogin={
        email:"",
        password:""
    }

    const initialRegisterValue={
        firstName:"",
        lastName:"",
        email:"",
        dob:dayjs(),
        password:"",
        confirmPassword:""
    }

    //----VALIDATION-----//

    const registerSchema=yup.object().shape({
        firstName:yup.string().required("required"),
        lastName: yup.string().required("required"),
        email: yup.string().email("Invalid email").required("required"),
        password: yup.string()
            .matches(
                regexpression, `${policyCriteria?.PolicyText}`
            )
            .required("required"),
        confirmPassword: yup.string()
            .test("Password-matched", "Password must match", function(value){return this.parent.password===value})
    })

    const loginSchema=yup.object().shape({
        email: yup.string().email("Invalid email").required("required"),
        password: yup.string().required("required"),
    })

    // -----------------------------

    const register = async (values, onSubmitProps) => {
        const savedUserResponse = await fetch(
          "http://localhost:5004/auth/register",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
          }
        );
        const savedUser = await savedUserResponse.json();
        // console.log("Saved User",savedUser);
        onSubmitProps.resetForm();
    
        if (savedUser) {
          setPageType("login");
        }
      };

 

    const login = async (values, onSubmitProps) => {
        const loggedInResponse = await fetch(
          "http://localhost:5004/auth/login",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
          }
        );
        const loggedIn = await loggedInResponse.json();
        // console.log(loggedIn);
        if(loggedIn){
            if(loggedIn?.user?.email==="nehaadmin@gmail.com"){
                dispatch(setAdmin({
                    adminToken:loggedIn.token,
                    admin:loggedIn.user
                }))
            }else{
                dispatch(setLogin({
                    token:loggedIn.token,
                    userDetail:loggedIn.user
                }))

            }

        }
        onSubmitProps.resetForm();
        navigate("/");
    
      };

    const handleFormSubmit=async (values, onSubmitProps)=>{
        // console.log(values);
       
        if(isLogin) await login(values, onSubmitProps); 
        if(isRegister) await register(values, onSubmitProps);   
    }




  return (
    <Formik 
        onSubmit={handleFormSubmit}
        initialValues={isLogin ? initialValueLogin : initialRegisterValue}
        validationSchema={isLogin ? loginSchema : registerSchema}
    >
    {({values, errors, touched, handleBlur, handleChange, handleSubmit, resetForm, setFieldValue})=>(
        <form onSubmit={handleSubmit}>
            <StyledPaper elevation={3}>
                <Box sx={{display:"flex", justifyContent:"center", alignItems:"center", margin:"10px"}}>
                    <Lock sx={{color:'#FFAB40'}} fontSize='large'/>
                
                </Box>
                <Stack direction="column" gap={2}>
                {isRegister && (
                    <Stack direction="row" gap={2} justifyContent="space-between" >
                        <TextField
                            label="First Name"
                            value={values.firstName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name='firstName'
                            error={Boolean(touched.firstName) && Boolean(errors.firstName)}
                            helperText={touched.firstName && errors.firstName}
                            fullWidth
                        />
                        <TextField
                            label="Last Name"
                            value={values.lastName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name='lastName'
                            error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                            helperText={touched.lastName && errors.lastName}
                            fullWidth

                        />
                        
                        
                    </Stack>
                    
                )}
                        <TextField
                            label="Email"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name='email'
                            error={Boolean(touched.email) && Boolean(errors.email)}
                            helperText={touched.email && errors.email}
                        />

                        {isRegister && (

                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label="Date of birth"
                                    value={dayjs(values.dob)}
                                    onChange={(val) => setFieldValue("dob", val?.$d)}
                                    onBlur={handleBlur}
                                    name="dob"
                                    error={Boolean(touched.dob) && Boolean(errors.dob)}
                                    helperText={touched.dob && errors.dob}
                                />
                            </LocalizationProvider>

                        )} 
                        
                        <TextField
                            label="Password"
                            type='password'
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name='password'
                            error={Boolean(touched.password) && Boolean(errors.password)}
                            helperText={touched.password && errors.password}
                        />
                        {isRegister && (
                            <TextField
                                label="Confirm Password"
                                type='password'
                                value={values.confirmPassword}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name='confirmPassword'
                                error={Boolean(touched.confirmPassword) && Boolean(errors.confirmPassword)}
                                helperText={touched.confirmPassword && errors.confirmPassword}
                            />

                        )}
                        <Button variant='contained' type='submit' sx={{backgroundColor:"#FFAB40", "&:hover":{backgroundColor:"#ff9100"}}}>
                            {isLogin ? "Login" : "Register"}
                        </Button>
                        <Typography
                            onClick={()=>{
                                setPageType(isLogin ? "register" : "login")
                                resetForm();
                            }}
                            sx={{textDecoration:"underline", color:"grey", 
                                "&:hover":{
                                    color:"#FFAB40",
                                    cursor:"pointer"
                                }
                            }}

                        >
                            {isLogin
                                ? "Don't have an account? Sign Up here."
                                : "Already have an account? Login here."
                            }
                        </Typography>

                        

                </Stack>
            </StyledPaper>
        </form>
    )}
      
    </Formik>
  )
}

export default Login;
