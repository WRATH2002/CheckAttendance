import Login from "./auth/Login";
import Signup from "./auth/Signup";
import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { db } from "../firebase";
import firebase from "../firebase";
import Landing from "./Landing";
// import Chatbody from "./Chatbody";
// import Sidebar from "./Sidebar";
// import { useSelector } from "react-redux";

const AuthDetails = () => {
  const [authUser, setAuthUser] = useState(null);
  const [mode, setMode] = useState(1);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else setAuthUser(null);
    });
    return () => {
      listen();
    };
  }, []);

  return (
    <>
      {authUser ? (
        <>
          {/* <Loading /> */}
          {/* <button className="font-bold" onClick={userSignOut}>
            Sign Out
          </button> */}
          <Landing />
        </>
      ) : (
        <>
          <div className="w-full h-[100dvh] flex flex-col justify-center items-center ">
            {mode === 1 ? (
              <Login data1={mode} data2={setMode} />
            ) : (
              <Signup data1={mode} data2={setMode} />
            )}
          </div>
        </>
      )}
    </>
  );
};

export default AuthDetails;
