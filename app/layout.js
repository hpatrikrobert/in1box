import { Inter } from 'next/font/google';
import './globals.css';
import NavBar from "../components/NavBar";
import { Grid } from "@mui/material";
import Navigation from "@/components/Navigation";
import Providers, { Mailbox_Context } from './providers';
import { useContext } from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: "In1Box",
  description: "All your mail in 1 inbox!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <NavBar />
          <Grid container spacing={0}>
            <Grid item xs={12} md={3} xl={2}>
              <Navigation />
            </Grid>
            <Grid item xs={12} md={9} xl={10} className="bg-slate-100">
              {children}
            </Grid>
          </Grid>
        </Providers>
      </body>
    </html>
  );
}
