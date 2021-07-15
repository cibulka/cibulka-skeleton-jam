import React, { FC, ReactChild } from "react";

import useGlobalStyles from "src/hooks/useGlobalStyles";
import useLocalStorage from "src/hooks/useLocalStorage";

import Nav from "./Nav";

import "tailwindcss/tailwind.css";

const Layout: FC<{
  children: ReactChild;
}> = (props) => {
  // Load data from localStorage to redux
  useLocalStorage();

  // Reset & custom global styles
  useGlobalStyles();

  return (
    <>
      {props.children}
      <Nav />
    </>
  );
};

export default Layout;
