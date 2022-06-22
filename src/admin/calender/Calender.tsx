import React, { useContext, useEffect, useState } from "react";
import UploadModal from "../uploadModal/UploadModal";
import axios from "axios";
import { ImExit } from "react-icons/im";
import { BiImages } from "react-icons/bi";
import { actionsWords, Context } from "../../utils/Reducer/AppContext";
import { adminActions, AdminContext } from "../adminreducer/AdminContext";
import { ServerPort } from "../../App";
import moment from "moment";
import { GrFormNext, GrFormPrevious } from "react-icons/gr/index";
import "./calender.scss";
const Calender: React.FC = () => {
  const today = moment().clone();

  const todayValue = moment().clone().format("MM/DD/YYYY");
  const contexData = useContext(Context);
  const { state, dispatch } = useContext(AdminContext);
  const [trackMonth, setTrackMonth] = useState(parseInt(today.format("MM")));

  const currentMonth = () => {
    return state.value.format("MMMM");
  };
  const currentYear = () => {
    return state.value.format("YYYY");
  };
  const prevMonth = () => {
    if (trackMonth === 1) {
      setTrackMonth(12);
    } else {
      setTrackMonth((pre) => pre - 1);
    }
    return state.value.clone().subtract(1, "month");
  };
  const nextMonth = () => {
    if (trackMonth === 12) {
      setTrackMonth(1);
    } else {
      setTrackMonth((pre) => pre + 1);
    }
    return state.value.clone().add(1, "month");
  };
  const openModal = (date: string) => {
    dispatch({ type: adminActions.openModal, payload: date });
  };

  const editCard = async (
    day: string,
    word: string,
    images: { url: string; _id: string }[],
    mainId: string
  ) => {
    dispatch({
      type: adminActions.showEditCard,
      editData: { day, word, images, mainId },
      payload: "",
    });
  };
  const closingTheModal = () => {
    dispatch({ type: adminActions.closeModal, payload: "" });
  };

  const getAllWords = async () => {
    dispatch({ type: adminActions.showLoading, payload: "" });
    try {
      const data = await axios.get(ServerPort + "/admin/getallwords");
      dispatch({
        type: adminActions.setWordsFromTheDatabase,
        payload: "",
        data: data.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const logout = async () => {
    await axios.get(ServerPort + "/admin/logout");
    contexData?.dispatch({ type: actionsWords.adminLogout, data: "" });
  };

  useEffect(() => {
    getAllWords();
  }, [state.status]);
  useEffect(() => {
    dispatch({ type: adminActions.setTheCalender, payload: "" });
  }, [state.value, state.wordsFromDatabase]); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div className=" h-full  w-full bg-gray-100 flex flex-col justify-center items-center">
      <div className="w-full p-3 bg-[#47d4aa] flex justify-between">
        <h1
          className="logo-sm text-white text-2xl font-bold calendar-header"
          style={{ fontFamily: "Nunito, sans-serif'" }}
        >
          WORDHASH
        </h1>
        <a href="#" className=" align-middle text-2xl text-white my-auto">
          <ImExit onClick={logout} />
        </a>
      </div>
      <div className="w-11/12 rounded-lg overflow-hidden">
        <div className=" w-full mx-auto mt-24">
          <div className=" bg-white p-2 w-full flex items-center justify-between text-xl">
            <div className=" text-xl font-bold ml-4 text-black ">
              {currentMonth()}{" "}
              <span className=" font-thin">{currentYear()}</span>
            </div>
            <span>{state.isLoading ? "Loading....." : undefined}</span>
            <div className="flex gap-2">
              <span
                className=" cursor-pointer text-3xl p-1 px-2 border-2 rounded-md text-center hover:bg-[#059ff9]  "
                onClick={() => {
                  dispatch({
                    type: adminActions.changeDayValue,
                    data: prevMonth(),
                    payload: "",
                  });
                }}
              >
                {<GrFormPrevious className=" text-sm" />}
              </span>
              <span
                onClick={() => {
                  dispatch({
                    type: adminActions.changeDayValue,
                    payload: "",
                    data: nextMonth(),
                  });
                }}
                className="cursor-pointer text-3xl p-1 px-2 border-2 rounded-md hover:bg-[#059ff9]"
              >
                {<GrFormNext className=" text-base" />}
              </span>
            </div>
          </div>
          {/* <div className=" w-full bg-white flex justify-around gap-3 ">
            {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((day) => {
              return (
                <span className="flex  flex-1  justify-center ">{day}</span>
              );
            })}
          </div> */}
        </div>

        <div className=" bg-gray-100 w-full flex flex-col ">
          <div className=" w-full bg-white flex justify-around gap-3 ">
            {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((day) => {
              return (
                <span className="flex  flex-1  justify-center ">{day}</span>
              );
            })}
          </div>

          {state.calender.map((week) => {
            return (
              <div className=" bg-gray-100 flex flex-row w-full ">
                {week.map((day) => {
                  if (parseInt(day.todayMoment.format("MM")) === trackMonth) {
                    return (
                      <div
                        className="flex relative flex-col flex-1 p-8 bg-white hover:bg-white/90 border-2 border-collapse "
                        onClick={() => {
                          dispatch({
                            type: adminActions.changeDayValue,
                            payload: "",
                            data: day.todayMoment,
                          });
                        }}
                      >
                        <span
                          className=" absolute top-2 left-2 p-[2px]"
                          id={
                            day.todayMoment.format("MM/DD/YYY") === todayValue
                              ? "today"
                              : ""
                          }
                          style={
                            day.todayMoment.format("MM/DD/YYYY") === todayValue
                              ? {

                                backgroundColor: '#009f06',
                                color: 'white',
                                height: '30px',
                                borderRadius: '50%',
                                width: '30px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'



                              }
                              : {}
                          }
                        >
                          {day.todayMoment.format("D").toString()}
                        </span>
                        {day.word ? (
                          <div
                            className="flex flex-col justify-center  items-center cursor-pointer"
                            onClick={() =>
                              editCard(
                                day.todayMoment.format("MM/DD/YYYY"),
                                day.word!,
                                day.imageurl,
                                day.mainId
                              )
                            }
                          >
                            <span className="uppercase text-blue-500 mx-auto text-xl">
                              {day.word}
                            </span>
                            <BiImages className=" absolute bottom-8 left-3 text-2xl" />
                            <span className=" ml-2">
                              {day.imageCount} clue-cards
                            </span>
                          </div>
                        ) : (
                          <button
                            onClick={() =>
                              openModal(day.todayMoment.format("MM/DD/YYYY"))
                            }
                            className=" bg-[#39853c] rounded-sm text-white w-16 py-2 self-center"
                          >
                            ADD
                          </button>
                        )}
                      </div>
                    );
                  } else {
                    return (
                      <div className="flex relative flex-col flex-1 p-8 bg-white hover:bg-white/90 border-2 border-collapse "></div>
                    );
                  }
                })}
              </div>
            );
          })}
          {state.isModalOpen ? (
            <UploadModal closingTheModal={closingTheModal} />
          ) : undefined}
        </div>
      </div>
      <div className="w-full mt-24 text-center bg-[#8ddb90] p-4 text-gary ">
        Copyright Vanilla Networks Pvt. Ltd. & Vanilla Networks Pty Ltd, 2021.
        All rights reserved.
      </div>
    </div>
  );
};

export default Calender;
