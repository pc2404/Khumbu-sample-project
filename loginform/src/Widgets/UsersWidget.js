import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../redux/UserSlice';
import UserWidget from './UserWidget';
import { Stack } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import ActiveUserWidget from './ActiveUserWidget';


const UsersWidget = () => {

  const dispatch=useDispatch();
  const allUsers=useSelector((state)=>state.users);
  const token=useSelector((state)=>state.token);
  // console.log("allusers", allUsers);


  const getFeed=async()=>{
    const response=await fetch("http://localhost:5004/users",{
      method:"GET"
    });
    const users=await response.json();
    console.log("users",users);
    if(users){
      dispatch(getUsers({users:users}));
    }

  }

  useEffect(()=>{
    getFeed();
  },[])

  return (

    <Grid container>
      {token && 
        <Grid item xs={3}>
          <Stack direction="row" justifyContent="center" sx={{bgcolor:"#f9fbe7", height:"100vh"}}>
            <ActiveUserWidget />
          </Stack>
        </Grid>
      
      }
      <Grid item xs={token ? 9 : 12}>
        <Stack direction="column" spacing={2} justifyContent="center" alignItems="center" sx={{backgroundColor:"#f0f4c3",
        height:"100vh", alignSelf:"center"}}>

          {allUsers.map((user)=><UserWidget user={user} />)}  
        </Stack>
    
      </Grid>
    
    </Grid>

  )
}

export default UsersWidget
