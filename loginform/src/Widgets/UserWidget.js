import styled from '@emotion/styled'
import { AlternateEmail, Edit, LockReset } from '@mui/icons-material'
import {Paper, Stack, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2';
import React from 'react'
import { formatDate } from '../Function/GlobalFunctions';
import { useSelector } from 'react-redux';
import ModalWidget from './ModalWidget';

const UserWidget = (props) => {
    const {firstName, lastName, email, dob, _id}=props.user;
    const formattedDate=formatDate(dob);
    const adminToken=useSelector((state)=>state.adminToken);

    const StyledPaper=styled(Paper)({
        width:"90%",
        padding:"20px",
        backgroundColor:"#f9fbe7",
        textAlign:"center"
    })
   
  return (
    <StyledPaper elevation={2}>
        <Grid container spacing={1}>
            <Grid item xs={4} display="flex" justifyContent="flex-start" alignItems="center">
                <Typography variant="body1" >{`${firstName} ${lastName}`}</Typography>
            </Grid>
            <Grid item xs={4} display="flex" justifyContent="center" alignItems="center">
                <Typography variant="body1">{email}</Typography>
            </Grid>
            <Grid item xs={4} display="flex" justifyContent="flex-end" alignItems="center">
                {adminToken ? 
                    <Stack direction="row" justifyContent="space-between">
                        <ModalWidget title={"Change name"} icon={<Edit />} dialogTitle={"Change firstname and lastname"} label={"First Name"} label2={"Last Name"} type={"text"} name={"firstName"} name2={"lastName"} userId={_id}/>
                        <ModalWidget title={"Change Email"} icon={<AlternateEmail />} dialogTitle={"Change email address"} label={"Email address"} type={"email"} name={"email"} userId={_id}/>
                        <ModalWidget title={"Change Password"} icon={<LockReset />} dialogTitle={"Change password"} label={"Password"} type={"password"} name={"password"} userId={_id}/>
                    </Stack>
                    :
                    <Typography variant="body1">{formattedDate}</Typography>

                }
            </Grid>
        </Grid>
       
  
      
    </StyledPaper>
  )
}

export default UserWidget
