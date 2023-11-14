import NavBar from '@/components/NavBar';
import Navigation from '@/components/Navigation';
import { Grid } from '@mui/material';
import React from 'react';

const Dashboard = ({ children }) => {
    return (
        <>
            <NavBar />
            <Grid container spacing={0}>
                <Grid item xs={12} md={3} xl={2}>
                    <Navigation />
                </Grid>
                <Grid item xs={12} md={9} xl={10} className="bg-slate-100">
                    {children}
                </Grid>
            </Grid>
        </>
    );
};

export default Dashboard;