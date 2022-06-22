import { useContext } from 'react'
import { Context, actionsWords } from "../../utils/Reducer/AppContext"


const Rules = () => {
    const contextData = useContext(Context)
    return (
        <div className=" absolute bg-gray-200/50 top-0 left-0 z-50 lg:h-full w-full h-[1030px] overflow-y-scroll   flex flex-col justify-center items-center">
            <div className='flex flex-col shadow-2xl rounded-md justify-center items-center bg-white lg:w-1/2 w-3/4 p-4'>

                <div className='flex flex-col gap-2' >
                    <li>  You have six guesses to find the word.
                    </li>
                    <li>The word may be a proper noun. </li>
                    <li>
                        Correct letters in correct places are marked in green.
                    </li>
                    <li>All other letters are marked in red.</li>
                    <li>Letters marked in red may appear elsewhere in the word.</li>
                    <li>Use the Share button to share a clue on social media.</li>
                    <li>Collect up to four clues on social media to help you find the word.</li>
                </div>
                <div className='flex justify-center items-center ' >
                    <button className='p-2' onClick={() => contextData?.dispatch({ type: actionsWords.toggleRules, data: "" })}>Close</button>
                </div>
            </div>
        </div>
    )
}

export default Rules