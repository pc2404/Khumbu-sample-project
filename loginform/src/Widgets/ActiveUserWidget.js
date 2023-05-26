import styled from '@emotion/styled'
import { Avatar, IconButton, Paper, Stack, Tooltip, Typography } from '@mui/material'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import React from 'react'
import { useSelector } from 'react-redux'
import { formatDate } from "../Function/GlobalFunctions"
import { AlternateEmail, Edit, LockReset, ManageAccounts } from '@mui/icons-material'
import FormDialogWidget from './FormDialogWidget.js'
import ModalWidget from './ModalWidget'

const ActiveUserWidget = () => {
    const userDetail = useSelector((state) => state.userDetail);
    const token = useSelector((state) => state.token);
    const { firstName, lastName, email, dob, _id } = userDetail;
    const formattedDate = formatDate(dob);

    const StyledPaper = styled(Paper)({
        height: "300px",
        width: "80%",
        padding: "20px",
        marginTop: "30px",
        backgroundColor: "#f0f4c3"
    })




    return (
        <StyledPaper elevation={2}>
            <Grid2 container spacing={2} sx={{ height: "105%" }}>
                <Grid2 item xs={3}>
                    <Avatar sx={{ bgcolor: "#4CAF50" }}>{`${firstName?.slice(0, 1)} ${lastName?.slice(0, 1)}`}</Avatar>
                </Grid2>
                <Grid2 item xs={9}>
                    <Typography variant='h6' sx={{ color: "grey" }}>{`${firstName} ${lastName}`}</Typography>
                </Grid2>
                <Grid2 item xs={12}>
                    <Typography sx={{ color: "grey" }}>{`Email : ${email}`}</Typography>
                </Grid2>
                <Grid2 item xs={12}>
                    <Typography sx={{ color: "grey" }}>{`DOB : ${formattedDate}`}</Typography>
                </Grid2>
                <Grid2 item xs={12} alignItems="flex-end">
                    <Stack direction="row" sx={{ bgcolor: "#ffb74d", borderRadius: "10px" }} justifyContent="space-between">
                        <ModalWidget title={"Change UserName"} icon={<Edit />} dialogTitle={"Change username"} label={"First Name"} label2={"Last Name"} type={"text"} name={"firstName"} name2={"lastName"} userId={_id}/>
                        <ModalWidget title={"Change Email"} icon={<AlternateEmail />} dialogTitle={"Change email address"} label={"Email address"} type={"email"} name={"email"} userId={_id}/>
                        <ModalWidget title={"Change Password"} icon={<LockReset />} dialogTitle={"Change password"} label={"Password"} type={"password"} name={"password"} userId={_id}/>
                    </Stack>
                </Grid2>
            </Grid2>



        </StyledPaper>
    )
}

export default ActiveUserWidget

