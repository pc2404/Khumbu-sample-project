import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { IconButton, Stack, TextField, Tooltip } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { fetchPolicy, generateRegexExpression } from "../Function/GlobalFunctions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { getUsers, setUserDetail } from "../redux/UserSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

const ModalWidget = ({title, icon, dialogTitle, label, label2, type, name, name2, userId}) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [policyCriteria, setPolicyCriteria]=useState({});
  const isUserName= name==="firstName";
  const isEmail= name==="email";
  const isPassword= name==="password";
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const token=useSelector((state)=>state.token);
 
  useEffect(()=>{
    fetchPolicy(setPolicyCriteria);
  },[])

  const regexpression=generateRegexExpression(policyCriteria.PolicyTemplate);

  const handleFormSubmit = async(values, onSubmitProps) => {
    // console.log("On submit save Values", values);
    if(isUserName) await updateNameFunction(values, onSubmitProps)
    if(isEmail) await updateEmailFunction(values, onSubmitProps);
    if(isPassword) await updatePasswordFunction(values, onSubmitProps)
  };

  // INITIAL VALUES-----

  const initialValueUserName = {
    firstName: "",
    lastName: ""
  }

  const initialValueEmail = {
    email: ""
  }

  const initialValuePassword = {
    password: ""
  }

  // VALIDATION ---------------

  const userNameSchema = yup.object().shape({
    firstName: yup.string().required("required"),
    lastName: yup.string().required("required"),
  })

  const emailSchema = yup.object().shape({
    email: yup.string().email("Invalid Email").required("required"),
  })

  const updateNameFunction=async(values, onSubmitProps)=>{
    
    values.userId=userId;
    const response=await fetch("http://localhost:5004/users/username",{
      method:"POST",
      headers:{ "Content-Type": "application/json" },
      body: JSON.stringify(values),
    })

    const responseJson=await response.json();
    // console.log("response", responseJson)
    if(responseJson){
      dispatch(getUsers({users:responseJson.users}))
      if(token)
        dispatch(setUserDetail({userDetail:responseJson.updatedUser}))
    }

    onSubmitProps.resetForm();
    handleClose();
    
  }
  const updateEmailFunction=async(values, onSubmitProps)=>{
    console.log("onSubmit", onSubmitProps);
    values.userId=userId;
    const response=await fetch("http://localhost:5004/users/email",{
      method:"POST",
      headers:{ "Content-Type": "application/json" },
      body: JSON.stringify(values),
    })

    const responseJson=await response.json();
    console.log("response", responseJson)
    if(!responseJson?.message){
      dispatch(getUsers({users:responseJson.users}))
      if(token)
        dispatch(setUserDetail({userDetail:responseJson.updatedUser}))
        
      onSubmitProps.resetForm();
      handleClose();
    }else{
      onSubmitProps.setErrors({'email':responseJson?.message});
      console.log("onSubmit", onSubmitProps);

    }

    
  }

  const updatePasswordFunction=async(values, onSubmitProps)=>{
    console.log("Hi");
    console.log("onSubmit", onSubmitProps);

    values.userId=userId;
    const response=await fetch("http://localhost:5004/users/password",{
      method:"POST",
      headers:{"Content-Type": "application/json"},
      body: JSON.stringify(values),
    })

    const responseJson=await response.json();
    if(responseJson){
      dispatch(getUsers({users:responseJson.users}))
      if(token)
        dispatch(setUserDetail({userDetail:responseJson.updatedUser}))
    }

    onSubmitProps.resetForm();
    handleClose();

  }

  const passwordSchema= yup.object().shape({
    password: yup.string()
            .matches(
                regexpression, `${policyCriteria?.PolicyText}`
            )
            .required("required")
  })

  // FUNCTIONS------------

  const handleInitialValues = () => {
    if(isUserName) return initialValueUserName;
    if(isEmail) return initialValueEmail;
    if(isPassword) return initialValuePassword;

  }

  const handleValidationSchema = () => {
    if(isUserName) return userNameSchema;
    if(isEmail) return emailSchema;
    if(isPassword) return passwordSchema;

  }


  return (
    <div>
      <Tooltip title={title}>
        <IconButton onClick={handleOpen}>
          {icon}
        </IconButton>
      </Tooltip>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={handleInitialValues()}
          validationSchema={handleValidationSchema()}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            resetForm,
            setFieldValue,
          
          }) => (
            <form onSubmit={handleSubmit}>
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  {dialogTitle}
                </Typography>
                <TextField
                  label={label}
                  type={type}
                  name={name}
                  value={values[name]}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(touched[name]) && Boolean(errors[name])}
                  helperText={touched[name] && errors[name] }
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
                <Stack direction="row" justifyContent="flex-end">
                  <Button onClose={handleClose}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    Save
                  </Button>
                </Stack>
              </Box>
            </form>
          )}
        </Formik>
      </Modal>
    </div>
  );
};

export default ModalWidget;
