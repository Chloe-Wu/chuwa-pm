import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOutUser } from "../app/userSlice";

export default function Layout() {
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  return (
    <>
      {/* test authorization */}
      {isAuthenticated ? (
        <>
          <button onClick={() => dispatch(logOutUser())}>Log out</button>
        </>
      ) : (
        <>
          <Link to="/login">Log in</Link>
          <Link to="/signup">Sign up</Link>
        </>
      )}
    </>
  );
}
