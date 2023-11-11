"use client";

import { Checkbox, Grid, useMediaQuery } from "@mui/material";
import React, { useEffect, useState } from "react";
import Email from "./Email";

const getEmails = async () => {
  try {
    const emails = await fetch("http://localhost:3000/api/emails/", { cache: "no-store" });
    return emails.json();
  } catch (error) {
    console.log(error);
  }
};

const EmailList = () => {
  const label = { inputProps: { "aria-label": "Select All Emails" } };

  const [emails, setEmails] = useState([]);

  // If you fetch data, use useEffect
  // TODO move this logic up the tree. We need to use the emails in more components (NavBar in this case)
  useEffect(() => {
    async function fetchData() {
      const { emails } = await getEmails();
      setEmails(emails);
    }
    fetchData();
  }, []);

  const isAboveMobileScreen = useMediaQuery("(min-width : 768px)");

  return (
    <div>
      {isAboveMobileScreen === true && (
        <div className="mx-10 px-4">
          <Grid container spacing={0} className="p-4 items-center">
            <Grid item xs={1}>
              <div>
                <Checkbox {...label} />
              </div>
            </Grid>
            <Grid item xs={2}>
              <p className=" text-sm text-slate-500">Email Sender</p>
            </Grid>
            <Grid item xs={5}>
              <div>
                <p className=" text-sm text-slate-500">Conversation</p>
              </div>
            </Grid>
            <Grid item xs={2}>
              <p className=" text-sm text-slate-500">Conversation Number</p>
            </Grid>
            <Grid item xs={2}>
              <p className=" text-sm text-slate-500">Last Updated</p>
            </Grid>
          </Grid>
        </div>
      )}
      {emails.map((email) => (
        <Email key={email._id} email={email} />
      ))}
    </div>
  );
};

export default EmailList;
