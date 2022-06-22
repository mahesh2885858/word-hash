import moment from "moment";
import React, { createContext, useReducer } from "react";
import AdminReducer from "./AdminReducer";
export interface calenderType {
  todayMoment: moment.Moment;
  today: string;
  id: string;
  mainId: string;
  idOfWord: string;
  word: undefined | string;
  imageCount: number;
  imageurl: { _id: string; url: string }[];
}
export interface adminAppType {
  calender: calenderType[][];
  value: moment.Moment;
  uploadDate: string;
  isModalOpen: boolean;

  wordOfTheDay: string;
  formImages: {
    imageurl: string | ArrayBuffer | null | undefined;
    id: string;
  }[];
  imagesFromDatabase: { url: string; _id: string }[];
  formfilesArray: FileList | [];
  wordsFromDatabase: [];
  isEditOn: boolean;
  entryId: string;
  status:
    | "uploaded"
    | "savedChanges"
    | "deletedImage"
    | "deletedEntry"
    | "deletedImage"
    | "";
  isLoading: boolean;

  uploadStatus: undefined | string;
}
export const AdminAppState: adminAppType = {
  calender: [],
  value: moment().clone(),
  uploadDate: "",
  isModalOpen: false,

  wordOfTheDay: "",
  formImages: [],
  imagesFromDatabase: [],
  formfilesArray: [],
  wordsFromDatabase: [],
  isEditOn: false,
  entryId: "",
  status: "",
  isLoading: false,

  uploadStatus: undefined,
};

export const adminActions = {
  showLoading: "SHOW_LOADING",
  changeDayValue: "CHANGE_DAY_VALUE",
  setWordsFromTheDatabase: "SET_WORDS_FROM_THE_DATABASE",
  setTheCalender: "SET_THE_CALENDER",
  onImageChange: "ON_IMAGE_CHANGE",
  changeTheword: "ON_CHANGE_WORD",
  deleteImageFromForm: "DELETE_IMAGE_FROM_FORM",
  deleteImageFromDatabase: "DELETE_IMAGE_FROM_DATABASE",
  uploadWord: "UPLOAD_WORD",
  openModal: "OPEN_MODAL",
  closeModal: "CLOSE_MODAL",
  showEditCard: "SHOW_EDIT_CARD",
  editTheWord: "EDIT_THE_WORD",
  setStatus: "SET_STATUS",
};
export interface adminActionType {
  payload: string;
  type: string;
  data?: any;
  editData?: {
    day: string;
    word: string;
    images: { url: string; _id: string }[];
    mainId: string;
  };
}
export const AdminContext = createContext<{
  state: typeof AdminAppState;
  dispatch: React.Dispatch<adminActionType>;
}>({
  state: AdminAppState,
  dispatch: ({ type, payload }: { type: string; payload: string }) => null,
});
const AdminContextProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(AdminReducer, AdminAppState);
  const value = { state, dispatch };
  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};
export default AdminContextProvider;
