import moment from "moment";
import { nanoid } from "nanoid";

const GetCalender = (value: moment.Moment, wordsFromDatabase: any[]) => {
    const startDay = value.clone().startOf("month").startOf("week");

    const endDay = value.clone().endOf("month").endOf("week");
    const day = startDay.clone().subtract(1, "day");
    const calender = [];
    while (day.isBefore(endDay, "day")) {
        calender.push(
            Array(7)
                .fill(0)
                .map(() => {
                    const todayMoment = day.add(1, "day").clone();
                    const today = todayMoment.format("MM/DD/YYYY");
                    const id = nanoid();
                    const datafromdatabase = wordsFromDatabase.filter(
                        (item) => item.date === today
                    );
                    if (datafromdatabase.length > 0) {
                        return {
                            todayMoment,
                            today,
                            id,
                            mainId: datafromdatabase[0]._id,
                            idOfWord: datafromdatabase[0]._id,
                            word: datafromdatabase[0].word,
                            imageCount: datafromdatabase[0].images.length,
                            imageurl: datafromdatabase[0].images,
                        };
                    } else {
                        return {
                            todayMoment,
                            today,
                            id,
                            mainId: "",
                            idOfWord: "",
                            word: undefined,
                            imageCount: 0,
                            imageurl: [],
                        };
                    }
                })
        );
    }
    return calender
}
export default GetCalender