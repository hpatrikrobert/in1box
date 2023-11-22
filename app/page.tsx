import Dashboard from "./dashboard/layout";
import React from "react";
import { props } from "./providers";


export default function Home({children}: props) {
  return (
    <>
      <Dashboard>
        {children}
      </Dashboard>
    </>
  );
}
