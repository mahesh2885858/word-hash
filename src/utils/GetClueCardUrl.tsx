import axios from "axios";
import { ServerPort } from "../App";
const GetClueCardUrl = async (today: string) => {
  try {
    const data = await axios.post(ServerPort + "/admin/gettodayword", { today });
    const imagesArray = data.data.images.map(
      (image: { url: string; _id: string }) => {
        return image.url;
      }
    );
    const randomNumber = Math.floor(Math.random() * imagesArray.length);
    const cluecardurl = imagesArray[randomNumber].split("/").pop();
    return cluecardurl;
  } catch (error) {
    console.log(error);
  }
};
export default GetClueCardUrl;
