import { stateType } from "./Reducer/AppContext"
const CalculateScore = (State: stateType) => {

    // const totalScoreBase = 72

    // const BaseScore = (totalScoreBase - (State.currentAttempt * 12))

    // const scoreFactor = 1 - (State.clueCardsShown * 0.2)
    // const totalScore = BaseScore * scoreFactor
    // const scoreRating = (totalScore * 5) / 72
    // // "mahesh.babu".split(".").pop()
    // const fixedScore = scoreRating.toFixed(1)
    // if (parseInt(float!) <= 5 && parseInt(fixedScore) !== 5) {
    //     return Math.floor(parseFloat(fixedScore)) + 0.5
    // }
    // if (parseInt(float!) <= 5 && parseInt(fixedScore) === 5) {
    //     return Math.floor(parseFloat(fixedScore))
    // }
    // if (parseInt(float!) > 5) {
    //     return parseInt(Math.ceil(parseFloat(fixedScore)).toString())


    // }




    // return parseFloat(scoreRating.toFixed(2))
    const baseScore = 10

    const score = baseScore - (State.currentAttempt + State.clueCardsShown)
    const fixedScore = (score / 2).toString()
    const float = parseFloat(fixedScore).toString().split(".").pop()
    if (score <= 1) {
        return 1
    } else {

        if (parseFloat(float!) === 5) return parseFloat((score / 2).toString())
        return parseInt(fixedScore)
    }
}
export default CalculateScore