import { ServerPort } from '../App'
import shuffleArray from './shuffleArray';
import axios from 'axios'
import { contextType, actionsWords } from './Reducer/AppContext';
const GetTodaysWord = async (today: string, contextData: contextType | null) => {

    try {
        const data = await axios.post(ServerPort + "/admin/gettodayword", {
            today,
        });
        contextData?.dispatch({
            type: actionsWords.getNewStateForTheDay,
            data: data.data.word,
            lettersArray: shuffleArray(data.data.word),
            clueCardUrlArray: data.data.images,
        });
    } catch (error) {
        console.log(error);
    }
};
export default GetTodaysWord