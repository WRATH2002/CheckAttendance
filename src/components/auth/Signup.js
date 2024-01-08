import React from "react";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { db } from "../../firebase";
import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { toggleStateMode } from "../../utils/chatSlice";
import toast, { Toaster } from "react-hot-toast";
// import { auth } from "../firebase";
// import { onAuthStateChanged, signOut } from "firebase/auth";
// import { db } from "../firebase";
// import firebase from "../../firebase";

const Signup = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function createUserCollection(user) {
    db.collection("SEM6")
      .doc(user.uid)
      .set({
        subjects: [
          { TDay: 0, ADay: 0, Sub: "Computer Networks" },
          { TDay: 0, ADay: 0, Sub: "Compiler Design" },
          { TDay: 0, ADay: 0, Sub: "Soft Computing" },
          { TDay: 0, ADay: 0, Sub: "Pre-Placement" },
          { TDay: 0, ADay: 0, Sub: "Compiler Design Lab" },
          { TDay: 0, ADay: 0, Sub: "Finance & Accounting" },
          { TDay: 0, ADay: 0, Sub: "SDP - VI" },
          { TDay: 0, ADay: 0, Sub: "ESP- VI" },
          { TDay: 0, ADay: 0, Sub: "Computer Networks Lab" },
          { TDay: 0, ADay: 0, Sub: "Data Analytics" },
        ],
        submitDate: 0,
        submitStatus: false,
      });
    console.log("done");
  }
  const signUp = (e) => {
    e.preventDefault();
    if (email.length === 0 || !email.includes("@gmail.com")) {
      toast.error("Enter valid Email id");
    } else if (password.length <= 6) {
      toast.error("Password must be atleast 6 digits");
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log(userCredential.user.uid);
          console.log(userCredential.user.email);
          console.log(userCredential);
          createUserCollection(userCredential.user);
          // db.collection("Chat Record")
          //   .doc(userCredential.user.uid)
          //   .collection("Chats");
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  };
  function changeModeTwo() {
    // dispatch(toggleStateMode(1));
    props.data2(1);
  }

  return (
    <>
      <Toaster position="bottom-center" reverseOrder={false} />
      <div className="w-[300px] lg:w-[350px] md:w-[350px] p-[40px] rounded-lg h-[70%] bg-[#ffe4bc] flex flex-col justify-center items-center">
        <div className="w-full flex flex-col">
          <pre className="text-[32px] text-[black]   font-medium">Signup </pre>
          <pre className="text-[14px] font-normal  text-[black] ">
            already a user
            <span
              className="text-[#ff6f3b]  cursor-pointer font-normal"
              style={{ transition: ".3s" }}
              onClick={() => changeModeTwo()}
            >
              {" "}
              login here
            </span>
          </pre>
        </div>
        {/* <div>Signup</div> */}

        <input
          className="input outline-none  mt-[40px]  w-full h-[40px] my-[6px] rounded-md px-[15px] font-normal text-[14px] text-[#000000] bg-[#ffb800] log"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <input
          className="input outline-none    w-full h-[40px] my-[6px] rounded-md px-[15px]   font-normal text-[14px] text-[#000000] bg-[#ffb800] log"
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
          className="w-full h-[40px] text-[#000000] font-medium  outline-none flex justify-center items-center bg-[#ffb800] hover:bg-[white] hover:text-[black] rounded-md mt-[30px]"
          style={{ transition: ".3s" }}
          type="submit"
          onClick={signUp}
        >
          {/* <pre className="font-semibold" onClick={signUp}> */}
          Sign Up
          {/* </pre> */}
        </button>
      </div>
    </>
  );
};

export default Signup;
