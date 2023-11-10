import { Checkbox } from "@mui/material";
import { Grid } from "@mui/material";
import moment from "moment";
import React from "react";

const Email = ({ email }) => {
  const label = { inputProps: { "aria-label": "Select Email" } };

  return (
    <div className="mx-10 px-4 border bg-white">
      <Grid container spacing={0} className="p-4 items-center">
        <Grid xs={1}>
          <div>
            <Checkbox {...label} />
          </div>
        </Grid>
        <Grid xs={2}>
          <p className="mr-4 line-clamp-1 font-bold">{email.sender}</p>
        </Grid>
        <Grid xs={5}>
          <div className="mr-4">
            <p className="font-bold line-clamp-1">{email.title}</p>
            <p className="line-clamp-1 text-slate-500">{email.content}</p>
          </div>
        </Grid>
        <Grid xs={2}>
          <p className="mr-4 line-clamp-1 font-bold">123456</p>
        </Grid>
        <Grid xs={2}>
          <p className="mr-4 line-clamp-1 font-bold">{moment(email.updatedAt).fromNow()}</p>
        </Grid>
      </Grid>
    </div>
  );
};

export default Email;
