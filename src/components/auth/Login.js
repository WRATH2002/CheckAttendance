import React from "react";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { db } from "../../firebase";
import { useState } from "react";
// --------------------Icons----------------
import { BiLogoFacebook } from "react-icons/bi";
import { BiLogoTwitter } from "react-icons/bi";
import { BiLogoInstagram } from "react-icons/bi";
import { BiLogoGoogle } from "react-icons/bi";
// import { useDispatch } from "react-redux";
// import { toggleStateMode } from "../../utils/chatSlice";
import toast, { Toaster } from "react-hot-toast";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
      })
      .catch((error) => {
        toast.error("Invalid Login Credentials");
        // toast.error(error.message);
        // console.log(error);
        // console.log(error.message);
      });
  };
  function changeMode() {
    console.log(props);
    props.data2(2);
    // dispatch(toggleStateMode(2));
  }
  return (
    <>
      <Toaster position="bottom-center" reverseOrder={false} />
      <div className="w-[300px] lg:w-[350px] md:w-[350px] p-[40px] rounded-xl h-[70%] bg-[#ffe4bc] flex flex-col justify-center items-center">
        {/* <span className="in  font-bold text-[40px] mb-[30px]">INFINITY</span> */}
        <div className="w-full flex flex-col ">
          <pre className="text-[32px] text-[black]  font-medium ">Login </pre>
          <pre className="text-[14px] font-normal text-[black]  ">
            new user
            <span
              className="text-[#ff6f3b]  cursor-pointer  font-normal"
              style={{ transition: ".3s" }}
              onClick={() => changeMode()}
            >
              {" "}
              signup here
            </span>
          </pre>
        </div>
        {/* <div>Signup</div> */}
        {/* <input
          className="outline-none  mt-[40px]  w-full h-[40px] my-[6px] rounded-md px-[15px] font-normal text-[14px] text-black bg-[#cdd8dd]"
          placeholder="Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></input> */}
        {/* <input
          className="outline-none    w-full h-[40px] my-[6px] rounded-md px-[15px] font-normal text-[14px] text-black bg-[#cdd8dd]"
          placeholder="Phone Number"
          type="tel"
          value={number}
          onChange={(e) => {
            if (number.length <= 10) {
              setNumber(e.target.value);
            } else {
            }
          }}
        ></input> */}
        <input
          className=" outline-none  mt-[40px] bg   w-full h-[40px] my-[6px] rounded-md px-[15px] font-normal text-[14px] text-[#000000] bg-[#ffb800]"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <input
          className=" outline-none     w-full h-[40px] my-[6px] rounded-md px-[15px] font-normal text-[14px] text-[#000000] bg-[#ffb800]"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        {/* <button
          type="submit"
          onClick={signUp}
          className="bg-slate-600 text-white w-[100px]"
        >
          Signup
        </button> */}
        <button
          className="w-full h-[40px] text-[#000000] font-medium outline-none flex justify-center items-center bg-[#ffb800] hover:bg-[white] hover:text-[black] rounded-md mt-[30px]"
          style={{ transition: ".3s" }}
          type="submit"
          onClick={signIn}
        >
          <pre className="font-semibold" onClick={signIn}>
            Log In
          </pre>
        </button>
      </div>
    </>
  );
};

export default Login;
