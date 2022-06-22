import React, { useContext } from "react";
import { CgClose } from "react-icons/cg";
import { ImCancelCircle } from "react-icons/im";
import { AdminContext, adminActions } from "../adminreducer/AdminContext";
import axios from "axios";
import { ServerPort } from "../../App";
interface propsType {
  closingTheModal?: () => void;
}
const UploadModal = (props: propsType) => {
  const { state, dispatch } = useContext(AdminContext);
  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: adminActions.onImageChange, payload: "", data: e });
    return;
  };
  const deleteImageFromForm = async (id: string, url?: string) => {
    dispatch({ type: adminActions.deleteImageFromForm, payload: id });

    if (state.isEditOn) {
      const removeImage = await axios.put(ServerPort + "/admin/removeImage", {
        entryId: state.entryId,
        imageId: id,
        url: url,
      });
      removeImage.status === 200 &&
        dispatch({ type: adminActions.setStatus, payload: "its deleted" }); //add dispatch method to delete imagefrom database
    }
  };
  const uploadWord = async (e: React.FormEvent) => {
    e.preventDefault();
    const galleryData = new FormData();
    for (let i = 0; i < state.formfilesArray!.length; i++) {
      galleryData.append("clue-card", state.formfilesArray![i]);
    }
    galleryData.append("word", state.wordOfTheDay);
    galleryData.append("date", state.uploadDate);
    dispatch({ type: adminActions.setStatus, payload: "Uploading...." });
    try {
      const data = await axios.post(
        ServerPort + "/admin/addcluecards",
        galleryData,
        {
          headers: {
            "content-type": "multipart/form-data",
          },
        }
      );
      if ((data.status = 200)) {
        dispatch({ type: adminActions.uploadWord, payload: "" });
      }
    } catch (error: any) {
      dispatch({ type: adminActions.setStatus, payload: error?.response.data });
    }
  };
  const editTheWord = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch({ type: adminActions.setStatus, payload: "saving changes....." });
    const galleryData = new FormData();
    for (let i = 0; i < state.formfilesArray!.length; i++) {
      galleryData.append("clue-card", state.formfilesArray![i]);
    }
    galleryData.append("entryId", state.entryId);
    galleryData.append("word", state.wordOfTheDay);
    galleryData.append("date", state.uploadDate);
    try {
      const data = await axios.put(
        ServerPort + "/admin/updateentry",
        galleryData
      );
      if ((data.status = 200)) {
        dispatch({ type: adminActions.editTheWord, payload: "" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="  fixed overflow-y-scroll	 top-1/2 left-1/2 w-full h-full flex justify-center items-center bg-black/80 -translate-x-1/2 -translate-y-1/2 z-10  ">
      <div className="shadow  relative rounded-lg bg-white overflow-hidden w-1/2 block p-8">
        <h2 className="font-bold text-2xl mb-6 text-gray-800 border-b pb-2">
          Word of the day
        </h2>
        <form
          encType="multipart/form-data"
          method="post"
          onSubmit={state.isEditOn ? editTheWord : uploadWord}
        >
          <div className="mb-4">
            <label className="text-gray-800 block mb-1 font-bold text-sm tracking-wide">
              Add five letter word
            </label>
            <input
              maxLength={5}
              className="bg-gray-200 appearance-none border-2 uppercase border-gray-200 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
              type="text"
              value={state.wordOfTheDay}
              onChange={(e) => {
                dispatch({
                  type: adminActions.changeTheword,
                  payload: e.target.value,
                });
              }}
            />
          </div>

          <div className="mb-4">
            <label className="text-gray-800 block mb-1 font-bold text-sm tracking-wide">
              Date chosen
            </label>
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
              type="text"
              readOnly
              value={state.uploadDate}
            />
          </div>

          <div className="mb-4">
            <label className="text-gray-800 block mb-1 font-bold text-sm tracking-wide">
              Upload clue cards
            </label>
            <input
              className="form-control  block w-full
                                            px-3
                                            py-1.5
                                            text-base
                                            font-normal
                                            text-gray-700
                                            bg-white bg-clip-padding
                                            border border-solid border-gray-300
                                            rounded
                                            transition
                                            ease-in-out
                                            m-0
                                            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              type="file"
              id="formFile"
              multiple
              name="clue-card"
              onChange={onImageChange}
            />
          </div>
          <div className=" w-full flex gap-2 ">
            {state.formImages.map((image) => {
              return (
                <div className=" w-28 my-2 shadow-2xl relative" key={image.id}>
                  <img
                    src={image.imageurl as string}
                    alt="img"
                    width={`100%`}
                  />
                  <button
                    className=" text-lg absolute font-bold -top-1 -right-1 bg-red-400 rounded-sm text-black "
                    onClick={() => deleteImageFromForm!(image.id)}
                  >
                    <CgClose />
                  </button>
                </div>
              );
            })}
          </div>
          <div className=" w-full flex gap-2">
            {state.imagesFromDatabase!.map((image) => {
              return (
                <div className=" w-28 my-2 relative" key={image._id}>
                  <img
                    src={`${ServerPort}/${image.url!.split("/").pop()}`}
                    alt="img"
                    width={`100%`}
                  />
                  <button
                    className=" text-lg absolute font-bold -top-1 -right-1 bg-red-400 rounded-sm text-black "
                    onClick={() => deleteImageFromForm!(image._id, image.url)}
                  >
                    <CgClose />
                  </button>
                </div>
              );
            })}
          </div>
          <div>{state.uploadStatus}</div>
          <div className="mt-8 text-center">
            <button
              className="bg-[#059ff9] mr-5 hover:bg-gray-700 text-white font-semibold py-1 px-4 rounded shadow-sm"
              onClick={props.closingTheModal!}
            >
              Close
            </button>
            {state.isEditOn ? (
              <button
                type="button"
                className="bg-[#059ff9] hover:bg-gray-700 text-white font-semibold py-1 px-4 rounded shadow-sm"
                onClick={editTheWord}
              >
                Save Changes
              </button>
            ) : (
              <button
                onClick={uploadWord}
                type="button"
                className="bg-[#059ff9] hover:bg-gray-700 text-white font-semibold py-1 px-4 rounded shadow-sm"
              >
                Submit
              </button>
            )}
          </div>
          <button
            onClick={props.closingTheModal!}
            className="absolute top-2 right-2 font-bold text-2xl"
          >
            {<ImCancelCircle />}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadModal;
