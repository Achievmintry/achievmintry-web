import React from "react";
import { Balance, Chievs } from "../components";

const Home = () => {
  return (
    <>
      <Balance />
      <Chievs featured={true} />
    </>
  );
};

export default Home;
