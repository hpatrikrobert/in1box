"use client";

import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { getSession } from "next-auth/react";

const WriteEmail = () => {
  const [sender, setSender] = useState("");
  const [email, setEmail] = useState({ sender: sender, title: "", content: "", user_id: "" });

  const router = useRouter();

  const handleSenderChange = (event) => {
    setSender(event.target.value);
  };

  const handleChange = async (event, request) => {
    const { name, value } = event.target;
    const userSessionID = await getSession({req: request});
    setEmail((prevEmail) => ({ ...prevEmail, sender: sender, [name]: value, user_id: userSessionID.user.email }));
    console.log(email);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email.sender || !email.title || !email.content) {
      alert("Sender, Title, and content are required!");
      return;
    }

    try {
      const newEmail = await fetch("http://localhost:3000/api/emails", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(email),
      });

      if (newEmail.ok) {
        router.push("/");
      } else {
        throw new Error("Failed to create a new email");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form id="newEmail" onSubmit={handleSubmit} className="p-10 w-4/6 mx-auto mt-20 bg-white border">
      <div className="flex space-x-2">
        <FormControl fullWidth>
          <InputLabel id="sender-label">From</InputLabel>
          <Select labelId="sender-label" id="sender" value={sender} label={"From"} onChange={handleSenderChange}>
            {/* TODO here we will use all email addresses that the user has connected */}
            <MenuItem value={"nielskoop@gmail.com"}>nielskoop@gmail.com</MenuItem>
          </Select>
        </FormControl>
        <TextField id="to-email-address" label="Recipient" variant="outlined" fullWidth />
      </div>
      <div className="mt-2 flex space-x-2">
        <TextField
          id="title"
          name="title"
          value={email.title}
          label="Title of email"
          variant="outlined"
          fullWidth
          onChange={handleChange}
        />
        <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
          Upload
          <VisuallyHiddenInput type="file" />
        </Button>
      </div>
      <textarea
        id="content"
        name="content"
        value={email.content}
        rows={15}
        className="border mt-2 w-full resize-none p-4"
        placeholder="What do you have to say..."
        onChange={handleChange}
      />
      <div className="flex justify-end">
        <button type="submit" className="bg-main-blue py-2 px-4 rounded text-white">
          <b>Send Email</b>
        </button>
      </div>
    </form>
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
