import React from "react";
import { Link as RouterLink } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>Home Page!</h1>
      <RouterLink to="/users">Users</RouterLink>{" "}
      <RouterLink to="/posts">Posts</RouterLink>
    </div>
  );
};

export default Home;
