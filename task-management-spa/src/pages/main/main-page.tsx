import { Box, Grid, Paper, Typography } from "@mui/material"
import styled from "styled-components"

import TaskListPage from "../task-page/task-list"

const Header = styled(Paper)`
    position: fixed;
    display: flex;
    width: 100%;
    height: 8vh;
    top: 0;
    left: 0;
    background-color:#eaeaea!important;
    align-items:center;
    z-index:1000
`
const MainPage = () => {
    return (
        <Box sx={{ flexGrow: 1, padding:"1rem" }}>
            <Grid container>
                <Grid item xs={12} md={12}>
                    <Header>
                        <Typography sx={{ fontWeight: 600, paddingX: "15px", fontSize: "24px" }}>Task Management App</Typography>
                    </Header>
                </Grid>
                <Grid item xs={12} md={12}>
                    <TaskListPage />
                </Grid>
            </Grid>
        </Box>
    )
}

export default MainPage