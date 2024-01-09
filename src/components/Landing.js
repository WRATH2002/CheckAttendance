import React, { useEffect, useState } from "react";
import { Monday } from "./constant";
import { Tuesday } from "./constant";
import { Wednesday } from "./constant";
import { Thursday } from "./constant";
import { Friday } from "./constant";
import { MondayTemp } from "./constant";
import { TuesdayTemp } from "./constant";
import { WednesdayTemp } from "./constant";
import { ThursdayTemp } from "./constant";
import { FridayTemp } from "./constant";
import { TiTick } from "react-icons/ti";
import toast, { Toaster } from "react-hot-toast";
import { auth } from "../firebase";
import { db } from "../firebase";
import firebase from "../firebase";
import { Timestamp, onSnapshot, serverTimestamp } from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { MdOutlineLogout } from "react-icons/md";

const Segment = (props) => {
  const [toggle, setToggle] = useState(false);
  const subName = props.data.Sub;
  const [temp1, setTemp1] = useState(0);
  const [temp2, setTemp2] = useState(0);
  const [recordData, setRecordData] = useState();
  const [isWorking, setIsWorking] = useState(false);

  useEffect(() => {
    console.log("Dataaaaaaaaaaa-----------------");
    console.log(recordData);
    if (recordData) {
      changeData();
      updateData();
    }
  }, [recordData]);

  function increaseAt() {
    const user = firebase.auth().currentUser;
    const subRef = db.collection("SEM6").doc(user.uid);
    subRef.get().then((data) => {
      console.log(data.data().subjects);
      setRecordData(data.data().subjects);
      // console.log(data.data().subjects[0]);
      data.data().subjects.forEach((element) => {
        console.log(element);
        // element.data().forEach((ele) => {
        //   console.log(ele[2]);
        // });
        if (element.Sub === subName) {
          console.log("Yesssssssssssssssssssssssssss");
          setTemp1(element.ADay + 1);
          setTemp2(element.TDay);
        }
      });
    });
  }

  function decreaseAt() {
    const user = firebase.auth().currentUser;
    const subRef = db.collection("SEM6").doc(user.uid);
    subRef.get().then((data) => {
      console.log(data.data().subjects);
      setRecordData(data.data().subjects);
      // console.log(data.data().subjects[0]);
      data.data().subjects.forEach((element) => {
        console.log(element);
        // element.data().forEach((ele) => {
        //   console.log(ele[2]);
        // });
        if (element.Sub === subName) {
          console.log("Yesssssssssssssssssssssssssss");
          setTemp1(element.ADay - 1);
          setTemp2(element.TDay);
        }
      });
    });
  }

  function changeData() {
    recordData.forEach((data) => {
      console.log("data34625762457");
      console.log(data);
      if (data.Sub === subName) {
        console.log("yes");
        data.ADay = temp1;
      }
    });
  }

  function updateData() {
    const user = firebase.auth().currentUser;
    const subbRef = db
      .collection("SEM6")
      .doc(user.uid)
      .update({ subjects: recordData });
    props.setWorkFlag(false);
  }
  return (
    <>
      <Toaster position="bottom-center" reverseOrder={false} />

      <div className="w-[80%] lg:w-[300px] h-[50px] my-[10px] rounded-xl  bg-[#FFE4BC] flex items-center justify-center ">
        <pre className="w-[calc(100%-60px)] pl-[10px] h-full flex justify-start items-center text-[14px]">
          {props.data.Sub}
        </pre>

        {toggle === false ? (
          <div
            className="w-[40px] h-[26px] rounded-[100px] bg-[#e4e4e4] flex justify-start items-center cursor-pointer shadow-inner "
            style={{ transition: ".4s" }}
            onClick={() => {
              if (props.flag === false) {
                if (props.workFlag === false) {
                  props.setWorkFlag(true);
                  setToggle(!toggle);
                  increaseAt();
                }
              } else {
                toast.error("Can't Change", {
                  style: {
                    borderRadius: "12px",
                    background: "#ffb800",
                    color: "#fff",
                    boxShadow: "none",
                    height: "49px",
                  },
                });
              }
            }}
          >
            <div
              className="w-[20px] h-[20px] rounded-full bg-white ml-[3px] drop-shadow-md"
              style={{ transition: ".4s" }}
            ></div>
          </div>
        ) : (
          <div
            className="w-[40px] h-[26px] rounded-[100px] bg-[#FFB800] flex justify-start items-center cursor-pointer shadow-inner"
            style={{ transition: ".4s" }}
            onClick={() => {
              if (props.flag === false) {
                if (props.workFlag == false) {
                  props.setWorkFlag(true);
                  setToggle(!toggle);
                  decreaseAt();
                }
              } else {
                toast.error("Can't Change", {
                  style: {
                    borderRadius: "12px",
                    background: "#ffb800",
                    color: "#fff",
                    boxShadow: "none",
                    height: "49px",
                  },
                });
              }
            }}
          >
            <div
              className="w-[20px] h-[20px] rounded-full bg-white ml-[17px] drop-shadow-md"
              style={{ transition: ".4s" }}
            ></div>
          </div>
        )}
      </div>
    </>
  );
};

const Landing = () => {
  var date = new Date();
  var day = date.getDay();
  // var day = 2;
  var datee =
    date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
  const [submit, setSubmit] = useState(false);
  const [isWorking, setIsWorking] = useState(false);
  const [subDate, setSubDate] = useState("");
  const [preDate, setPreDate] = useState("");
  const [recordLastData, setRecordLastData] = useState();
  const [tday, setTday] = useState(0);
  const [show, setShow] = useState(false);
  const [recordDataa, setRecordDataa] = useState();
  const [tempRoutine, setTempRoutine] = useState();

  function create() {
    const user = firebase.auth().currentUser;
    // console.log(user.uid);
    db.collection("SEM6").doc(user.uid).set({ name: "hp" });
  }

  const userSignOut = () => {
    signOut(auth)
      .then(() => console.log("Signed Out Successfully"))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getSubmitInfo();
    fetchDataforPercent();
  }, []);

  useEffect(() => {
    if (subDate) {
      checkSubCondition();
    }
  }, [subDate, preDate]);

  function getSubmitInfo() {
    const user = firebase.auth().currentUser;
    const submitRef = db.collection("SEM6").doc(user.uid);
    onSnapshot(submitRef, (data) => {
      setSubmit(data.data().submitStatus);
      setSubDate(data.data().submitDate);
      setPreDate(data.data().presentDate);
    });

    const timeRef = db
      .collection("SEM6")
      .doc(user.uid)
      .update({ presentDate: date.getDate() });
  }

  function checkSubCondition() {
    const user = firebase.auth().currentUser;
    // const e = preDate.localeCompare(subDate);
    if (preDate === subDate) {
      // console.log("same -----------------------");
      db.collection("SEM6").doc(user.uid).update({ submitStatus: true });
    } else {
      // console.log(" not same -----------------------");
      db.collection("SEM6").doc(user.uid).update({ submitStatus: false });
    }
  }

  function updateSubmitStatus() {
    const user = firebase.auth().currentUser;
    const submitRef = db
      .collection("SEM6")
      .doc(user.uid)
      .update({ submitStatus: true });
    const timeRef = db
      .collection("SEM6")
      .doc(user.uid)
      .update({ submitDate: date.getDate() });

    fetchData();
  }

  function fetchData() {
    const user = firebase.auth().currentUser;
    const subRef = db.collection("SEM6").doc(user.uid);
    subRef.get().then((data) => {
      setRecordLastData(data.data().subjects);
      // console.log("data.data().subjects[0].TDay");
      // console.log(data.data().subjects[0].TDay);
      setTday(data.data().subjects[0].TDay);
    });
  }

  function fetchDataforPercent() {
    const user = firebase.auth().currentUser;
    const subRef = db.collection("SEM6").doc(user.uid);
    subRef.get().then((data) => {
      setRecordDataa(data.data().subjects);
    });
  }

  useEffect(() => {
    if (recordLastData) {
      finalUpdate();
    }
  }, [recordLastData]);

  function finalUpdate() {
    const user = firebase.auth().currentUser;
    if (day === 1) {
      MondayTemp.map((sub) => {
        recordLastData.forEach((element) => {
          if (sub.Sub === element.Sub) {
            let tempVar = element.TDay;
            element.TDay = tempVar + 1;
          }
        });
      });
    } else if (day === 2) {
      TuesdayTemp.map((sub) => {
        recordLastData.forEach((element) => {
          if (sub.Sub === element.Sub) {
            let tempVar = element.TDay;
            element.TDay = tempVar + 1;
          }
        });
      });
    } else if (day === 3) {
      WednesdayTemp.map((sub) => {
        recordLastData.forEach((element) => {
          if (sub.Sub === element.Sub) {
            let tempVar = element.TDay;
            element.TDay = tempVar + 1;
          }
        });
      });
    } else if (day === 4) {
      ThursdayTemp.map((sub) => {
        recordLastData.forEach((element) => {
          if (sub.Sub === element.Sub) {
            let tempVar = element.TDay;
            element.TDay = tempVar + 1;
          }
        });
      });
    } else if (day === 5) {
      FridayTemp.map((sub) => {
        recordLastData.forEach((element) => {
          if (sub.Sub === element.Sub) {
            let tempVar = element.TDay;
            element.TDay = tempVar + 1;
          }
        });
      });
    }

    // recordLastData.forEach((element) => {
    //   let tempVar = element.TDay;

    //   element.TDay = tempVar + 1;
    // });
    const subbRef = db
      .collection("SEM6")
      .doc(user.uid)
      .update({ subjects: recordLastData });
  }

  return (
    <div className="w-[100%] h-[100svh] flex flex-col justify-center items-center">
      {show === true ? (
        <>
          {/* <div className="w-[100%] h-[100svh] drop-shadow-md fixed"> */}
          <div
            className="w-[80%] lg:w-[300px] h-[calc(100%-160px)]  bg-[#ffe4bc] rounded-xl  fixed bottom-[80px] overflow-hidden z-40 flex flex-col justify-center items-center"
            style={{ transition: ".4s" }}
          >
            {recordDataa?.map((daata) => {
              return (
                <>
                  <div className="w-[100%] lg:w-[300px] h-[40px]  my-[5px] rounded-xl  bg-[#FFE4BC] flex items-center justify-center ">
                    <pre className="w-[calc(100%-70px)] pl-[20px] h-full  flex justify-start items-center text-[14px]">
                      {daata?.Sub}
                    </pre>

                    <pre
                      className="w-[70px] h-[26px] rounded-[100px] flex justify-end pr-[10px] items-center cursor-pointer text-[14px] "
                      // style={{ transition: ".4s" }}
                    >
                      {daata?.TDay == 0 ? (
                        <>
                          -- [{daata?.ADay}/{daata?.TDay}]
                        </>
                      ) : (
                        <>
                          {(daata?.ADay / daata?.TDay) * 100}% [{daata?.ADay}/
                          {daata?.TDay}]
                        </>
                      )}
                    </pre>
                  </div>
                </>
              );
            })}
          </div>
          {/* </div> */}
        </>
      ) : (
        <>
          {/* <div className="w-[100%] h-[100svh] drop-shadow-md fixed"> */}
          <div
            className="w-[80%] h-[0]  bg-[#ffe4bc] rounded-xl  fixed bottom-[80px] overflow-hidden z-40"
            style={{ transition: ".4s" }}
          >
            {recordDataa?.map((daata) => {
              return (
                <>
                  <div className="w-[100%] lg:w-[300px] h-[40px]  my-[5px] rounded-xl  flex items-center justify-center ">
                    <pre className="w-[calc(100%-70px)] pl-[20px] h-full flex justify-start items-center text-[14px]">
                      {daata?.Sub}
                    </pre>

                    <pre
                      className="w-[70px] h-[26px] rounded-[100px] flex justify-center items-center cursor-pointer text-[14px] "
                      // style={{ transition: ".4s" }}
                    >
                      37.45%
                    </pre>
                  </div>
                </>
              );
            })}
          </div>
          {/* </div> */}
        </>
      )}
      <div className="w-[80%] lg:w-[300px] h-[80px]  flex justify-center items-center ">
        <pre className="w-[50%] h-full font-semibold text-[25px] flex justify-start items-center">
          {day === 1 ? (
            <>MONDAY</>
          ) : day == 2 ? (
            <>TUESDAY</>
          ) : day == 3 ? (
            <>WEDNESDAY</>
          ) : day == 4 ? (
            <>THURSDAY</>
          ) : day == 5 ? (
            <>FRIDAY</>
          ) : day == 6 ? (
            <>SATURDAY</>
          ) : (
            <>SUNDAY</>
          )}
        </pre>
        <pre className="w-[50%] h-full  text-[14px] flex justify-end items-center">
          {datee}
        </pre>
      </div>
      <div className="w-full  h-[calc(100%-160px)]  flex flex-col justify-center items-center">
        {day === 1 ? (
          <>
            {Monday.map((subjects) => {
              return (
                <Segment
                  data={subjects}
                  flag={submit}
                  workFlag={isWorking}
                  setWorkFlag={setIsWorking}
                />
              );
            })}
          </>
        ) : day == 2 ? (
          <>
            {Tuesday.map((subjects) => {
              return (
                <Segment
                  data={subjects}
                  flag={submit}
                  workFlag={isWorking}
                  setWorkFlag={setIsWorking}
                />
              );
            })}
          </>
        ) : day == 3 ? (
          <>
            {Wednesday.map((subjects) => {
              return (
                <Segment
                  data={subjects}
                  flag={submit}
                  workFlag={isWorking}
                  setWorkFlag={setIsWorking}
                />
              );
            })}
          </>
        ) : day == 4 ? (
          <>
            {Thursday.map((subjects) => {
              return (
                <Segment
                  data={subjects}
                  flag={submit}
                  workFlag={isWorking}
                  setWorkFlag={setIsWorking}
                />
              );
            })}
          </>
        ) : day == 5 ? (
          <>
            {Friday.map((subjects) => {
              return (
                <Segment
                  data={subjects}
                  flag={submit}
                  workFlag={isWorking}
                  setWorkFlag={setIsWorking}
                />
              );
            })}
          </>
        ) : (
          <>
            <pre className="text-[14px]">No Classes Today! Enjoy</pre>
          </>
        )}
        {/* {day == 1 || day == 2 || day == 3 || day == 4 || day == 5 ? (
          <div className="w-[50px] h-[50px] rounded-full bg-[#FFB800] flex justify-center items-center">
            <TiTick className="text-white text-[25px]" />
          </div>
        ) : (
          <></>
        )} */}
      </div>
      <div className="w-[80%] lg:w-[300px] h-[80px]  flex justify-center items-center">
        <div
          className="w-[50px] h-[50px] rounded-xl bg-[#ffe4bc] flex justify-center items-center font-semibold text-[19px] cursor-pointer hover:bg-[#FFB800]"
          style={{ transition: ".4s" }}
          onClick={() => {
            setShow(!show);
            // if (show === false) {
            //   toast.error("Refresh to Update", {
            //     style: {
            //       borderRadius: "12px",
            //       background: "#ffb800",
            //       color: "#fff",
            //       boxShadow: "none",
            //       height: "49px",
            //     },
            //   });
            // }
          }}
        >
          %
        </div>
        <div className="ml-[20px] w-[calc(100%-140px)] mr-[20px]">
          {day == 1 || day == 2 || day == 3 || day == 4 || day == 5 ? (
            <>
              {submit === false ? (
                <pre
                  className="w-full h-[50px] rounded-xl bg-[#FFB800] flex justify-center items-center font-semibold text-black cursor-pointer "
                  style={{ transition: ".4s" }}
                  onClick={() => {
                    setSubmit(true);
                    updateSubmitStatus();
                  }}
                >
                  SUBMIT <TiTick className="text-black text-[25px]" />
                </pre>
              ) : (
                <pre
                  className="w-full h-[50px] rounded-xl bg-[#ffe4bc] flex justify-center items-center font-semibold text-black cursor-pointer hover:bg-[#ffe4bc]"
                  style={{ transition: ".4s" }}
                  onClick={() => {
                    setSubmit(true);
                    toast.error("Already Submitted", {
                      style: {
                        borderRadius: "12px",
                        background: "#ffb800",
                        color: "#fff",
                        boxShadow: "none",
                        height: "49px",
                      },
                    });
                  }}
                >
                  SUBMITED <TiTick className="text-[#FFB800] text-[25px]" />
                </pre>
              )}
            </>
          ) : (
            <></>
          )}
        </div>
        <div
          className="w-[50px] h-[50px] rounded-xl bg-[#ffe4bc] flex justify-center items-center font-semibold text-[19px] hover:bg-[#FFB800] cursor-pointer"
          style={{ transition: ".4s" }}
          onClick={() => {
            userSignOut();
            // ee();
          }}
        >
          <MdOutlineLogout className="text-[20px]" />
        </div>
      </div>
    </div>
  );
};

export default Landing;
