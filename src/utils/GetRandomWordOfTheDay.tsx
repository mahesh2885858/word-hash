import moment from 'moment'
const GetRandomWordOfTheDay = (limit: number) => {
    const randomNumber = Math.floor(Math.random() * limit)
    const now = moment().clone()
    return now.subtract(randomNumber, 'days').format("MM/DD/YYYY")
}
export default GetRandomWordOfTheDay