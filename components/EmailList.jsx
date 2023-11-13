"use client";

import { Checkbox, Grid, useMediaQuery } from "@mui/material";
import React, { useContext } from "react";
import Email from "./Email";
import { Email_Context } from "@/app/providers";

const EmailList = () => {
  const label = { inputProps: { "aria-label": "Select All Emails" } };

  const { emails } = useContext(Email_Context);

  const isAboveMobileScreen = useMediaQuery("(min-width : 960px)");

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
