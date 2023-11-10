import { Inter } from 'next/font/google';
import './globals.css';
import NavBar from "../components/NavBar";
import { Grid } from "@mui/material";
import Sidebar from "@/components/Sidebar";

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: "In1Box",
  description: "All your mail in 1 inbox!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavBar />
        <Grid container spacing={0} className="h-[calc(100vh-6rem)]">
          <Grid xs={2} className="px-4 border-r-2 border-slate-300 flex flex-col justify-between">
            <Sidebar />
          </Grid>
          <Grid xs={10} className="bg-slate-100">
            {children}
          </Grid>
        </Grid>
      </body>
    </html>
  );
}
