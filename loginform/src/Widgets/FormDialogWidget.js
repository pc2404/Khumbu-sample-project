import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { IconButton, Tooltip } from '@mui/material';
import { Formik } from 'formik';
import * as yup from "yup";
import { generateRegexExpression } from '../Function/GlobalFunctions';


const FormDialogWidget=({title, icon, dialogTitle, label, label2, type, name, name2})=> {
  const [open, setOpen] = useState(false);
  const isUserName= name==="firstName";
  const isEmail= name==="email";
  const isPassword= name==="password";
  const [policyCriteria, setPolicyCriteria]=useState({});
  console.log("label", label, "label2", label2, "name", name)
  console.log("isEmail", isEmail);

  const fetchPolicy=async()=>{
    const response=await fetch("https://idm-core-service-proxy-sandbox.khumbusystems.net/api/application/password-policy?applicationID=money360_cardholder_web_ui@ist&isnew=false&language=en")
    const policyRes=await response.json();
    const policyObj=policyRes.Response;
    // console.log("response",policyRes.Response);
    setPolicyCriteria(policyObj);
    
  }

  useEffect(()=>{
      fetchPolicy();
  },[])

  const regexpression=generateRegexExpression(policyCriteria.PolicyTemplate);
  // console.log(regexpression);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const initialValueUserName={
    firstName:"",
    lastName:""
  }

  const initialValueEmail={
    email:"rup@gmail.com"
  }

  const initialValuePassword={
    password:""
  }

  // VALIDATION ---------------

  const userNameSchema= yup.object().shape({
    firstName:yup.string().required("required"),
    lastName:yup.string().required("required"),
  })

  const emailSchema= yup.object().shape({
    email: yup.string().email("Invalid Email").required("required"),
  })

  const handleFormSubmit=(values, submitProps)=>{
    console.log("HI")
    console.log("form value:", values)
  }

  const handleInitialValues=()=>{
    if(isUserName) return initialValueUserName;
    if(isEmail) return initialValueEmail;
    if(isPassword) return initialValuePassword;
    
  }

  console.log("Initial value", handleInitialValues())
  
  const handleValidationSchema=()=>{
    if(isUserName) return userNameSchema;
    if(isEmail) return emailSchema;
    if(isPassword) return passwordSchema;

  }

  const passwordSchema= yup.object().shape({
    password: yup.string()
            .matches(
                regexpression, `${policyCriteria?.PolicyText}`
            )
            .required("required")
  })



  return (
    <div>
        <Tooltip title={title}>
            <IconButton onClick={handleClickOpen}>
                {icon}
            </IconButton>
        </Tooltip>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>
          <Formik 
            onSubmit={handleFormSubmit}
            initialValues={{email:""}}
            validationSchema={emailSchema}
          >
          {({values, errors, touched, handleBlur, handleChange, handleSubmit, resetForm, setFieldValue})=>(
              <form onSubmit={handleSubmit}>

                <TextField
                  label={label}
                  // value={values.email}
                  onChange={(val) => setFieldValue("email", val?.target.value)}
                  onBlur={handleBlur}
                  name="email"
                  error={Boolean(touched.email) && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                  // type={type}
                  fullWidth
                  variant="standard"
                />
                  {label2 && 
                    <TextField
                    label={label2}
                    value={values[name2]}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name={name2}
                    error={Boolean(touched[name2]) && Boolean(errors[name2])}
                    helperText={touched[name2] && errors[name2]}
                    type={type}
                    fullWidth
                    variant="standard"
                  />
                }
              </form>
          )}
          
          </Formik>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type='submit'>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default FormDialogWidget;