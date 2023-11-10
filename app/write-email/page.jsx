"use client";

import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import SendIcon from "@mui/icons-material/Send";
import React, { useState } from "react";

const WriteEmail = () => {
  const [email, setEmail] = useState("");

  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  return (
    <div className="p-10 w-4/6 mx-auto mt-20 bg-white border">
      <div className="flex space-x-2">
        <FormControl fullWidth>
          <InputLabel id="select-from-email-label">From</InputLabel>
          <Select
            labelId="select-from-email-label"
            id="select-from-email"
            value={email}
            label={"Email"}
            onChange={handleChange}>
            {/* TODO here we will use all email addresses that the user has connected */}
            <MenuItem value={"nielskoop@gmail.com"}>nielskoop@gmail.com</MenuItem>
          </Select>
        </FormControl>
        <TextField id="to-email-address" label="Recipient" variant="outlined" fullWidth />
      </div>
      <div className="mt-2 flex space-x-2">
        <TextField id="email-title" label="Title of email" variant="outlined" fullWidth />
        <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
          Upload
          <VisuallyHiddenInput type="file" />
        </Button>
      </div>
      <textarea
        name="email-content"
        id="email-content"
        rows={15}
        className="border mt-2 w-full resize-none p-4"
        placeholder="What do you have to say..."
      />
      <div className="flex justify-end">
        <Button component="label" variant="contained" startIcon={<SendIcon />}>
          <b>Send Email</b>
        </Button>
      </div>
    </div>
  );
};

export default WriteEmail;

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
