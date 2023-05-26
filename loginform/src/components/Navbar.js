import styled from '@emotion/styled';
import { AccountCircle, Fitbit, Login, Logout } from '@mui/icons-material';
import { Avatar, Box, ListItemIcon, Menu, MenuItem, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { setLogOut } from '../redux/UserSlice';

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const adminToken=useSelector((state)=>state.adminToken);
    function handleExpand() {
        setOpen((prev) => !prev);
    }
    const token=useSelector((state)=>state.token);
  
    const StyledBox=styled(Box)({
        height:"60px",
        padding:"10px 20px",
        backgroundColor:"#ffab40",
        position:"fixed",
        width:"100%",
        boxShadow : "0 0 .5em rgba(0, 0, 0, .5)"
    })


  return (

    <StyledBox>
        <Grid container>
            <Grid item xs={8} display="flex" justifyContent="flex-start" alignItems="center">
                <Fitbit fontSize='large' />
                FITBIT
            </Grid>
            <Grid item xs={4} display="flex" justifyContent="flex-end" alignItems="center">
                {adminToken && <Typography>NEHA</Typography> } 
                <AccountCircle fontSize='large' onClick={handleExpand} />
            </Grid>
    
        </Grid>
        <Menu
            open={open}
            onClose={() => setOpen(false)}
            anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
            }}
            transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
            }}
        >
            <MenuItem>My account</MenuItem>
            {(token || adminToken) ?
                <MenuItem onClick={()=>dispatch(setLogOut())}>
                    <ListItemIcon >
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
                
                :
                <MenuItem onClick={()=>navigate("/login")}>
                    <ListItemIcon>
                        <Login fontSize="small" />
                    </ListItemIcon>
                    Login
                </MenuItem>
            }
            
        </Menu>
    
    </StyledBox>
  )
}

export default Navbar
