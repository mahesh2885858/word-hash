import convertImagesToArrayBuffer from "../../utils/convertImagestoArrayBuffer";
import GetCalender from "../../utils/getcalender/GetCalender";
import { AdminAppState } from "./AdminContext";
import { adminActionType, adminActions } from "./AdminContext";
const AdminReducer = (
  state: typeof AdminAppState,
  action: adminActionType
): typeof AdminAppState => {
  switch (action.type) {
    case adminActions.showLoading:
      return { ...state, isLoading: true };
    case adminActions.changeDayValue:
      return { ...state, value: action.data };
    case adminActions.setWordsFromTheDatabase:
      return {
        ...state,
        wordsFromDatabase: action.data,
        status: "",
        isLoading: false,
      };
    case adminActions.setTheCalender:
      return {
        ...state,
        calender: GetCalender(state.value, state.wordsFromDatabase),
      };
    case adminActions.openModal:
      return { ...state, isModalOpen: true, uploadDate: action.payload };
    case adminActions.changeTheword:
      return {
        ...state,
        wordOfTheDay: action.payload,
        uploadStatus: undefined,
      };
    case adminActions.onImageChange:
      return {
        ...state,
        formImages: convertImagesToArrayBuffer(action.data),
        formfilesArray: action.data.target.files!,
      };
    case adminActions.deleteImageFromForm:
      return {
        ...state,
        imagesFromDatabase: state.imagesFromDatabase.filter(
          (image) => image._id !== action.payload
        ),
        formImages: state.formImages.filter(
          (item) => item.id !== action.payload
        ),
      };
    case adminActions.deleteImageFromDatabase:
      return { ...state, status: "deletedImage" };
    case adminActions.setStatus:
      return { ...state, uploadStatus: action.payload };
    case adminActions.uploadWord:
      return {
        ...state,
        wordOfTheDay: "",
        isModalOpen: false,
        formImages: [],
        status: "uploaded",
        uploadStatus: undefined,
        formfilesArray: [],
      };
    case adminActions.showEditCard:
      return {
        ...state,
        isEditOn: true,
        isModalOpen: true,
        uploadDate: action.editData?.day!,
        wordOfTheDay: action.editData?.word!,
        imagesFromDatabase: action.editData?.images!,
        entryId: action.editData?.mainId!,
      };
    case adminActions.closeModal:
      return {
        ...state,
        isModalOpen: false,
        isEditOn: false,
        wordOfTheDay: "",
        imagesFromDatabase: [],
        entryId: "",
        uploadDate: "",
        formImages: [],
        formfilesArray: [],
      };
    case adminActions.editTheWord:
      return {
        ...state,
        formImages: [],
        wordOfTheDay: "",
        isModalOpen: false,
        isEditOn: false,
        formfilesArray: [],
        imagesFromDatabase: [],
        status: "savedChanges",
        uploadStatus: undefined
      };
    default:
      return state;
  }
};
export default AdminReducer;
