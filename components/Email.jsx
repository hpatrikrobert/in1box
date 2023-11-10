import { Checkbox } from "@mui/material";
import { Grid } from "@mui/material";
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
          <p>{email.sender}</p>
        </Grid>
        <Grid xs={5}>
          <div>
            <p className="font-bold">{email.title}</p>
            <p>{email.content}</p>
          </div>
        </Grid>
        <Grid xs={2}>
          <p>123</p>
        </Grid>
        <Grid xs={2}>
          <p>{email.updatedAt}</p>
        </Grid>
      </Grid>
    </div>
  );
};

export default Email;
