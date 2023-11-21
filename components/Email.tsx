import { Checkbox, useMediaQuery } from "@mui/material";
import { Grid } from "@mui/material";
import moment from "moment";
import Link from "next/link";
import React, { useState, MouseEvent } from "react";
import Mail from "@/interfaces/email_Interface";

const Email = (email: Mail) => {
  const isAboveMobileScreen = useMediaQuery("(min-width : 960px)");
  const [isChecked, setChecked] = useState(false);

  const handleCheckboxClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    setChecked(!isChecked);
  };

  return (
    <>
      {isAboveMobileScreen ? (
        <Link href={`/dashboard/${email._id}`}>
          <div className="mx-10 px-4 border bg-white hover:bg-slate-50">
            <Grid container spacing={0} className="p-4 items-center">
              <Grid xs={1}>
                <div
                  className="cursor-pointer"
                  onMouseOver={(e) => {
                    e.preventDefault();
                  }}
                  onClick={handleCheckboxClick}>
                  <Checkbox />
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
        </Link>
      ) : (
        // TODO find out why the background is not slate-300
        <div className="bg-white py-2 px-4 border-b">
          <div className=" flex justify-between">
            <h3 className=" font-bold text-lg">{email.sender}</h3>
            <p className=" text-slate-400">{moment(email.updatedAt).fromNow()}</p>
          </div>
          <p className="font-bold line-clamp-1">{email.title}</p>
          <p className=" text-slate-500 line-clamp-1 text-sm">{email.content}</p>
        </div>
      )}
    </>
  );
};

export default Email;
