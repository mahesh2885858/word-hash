import { useContext } from 'react'
import { Context, actionsWords } from "../../utils/Reducer/AppContext"


const Rules = () => {
    const contextData = useContext(Context)
    return (
        <div className=" absolute bg-gray-200/50 top-0 left-0 z-50 lg:h-full w-full h-screen overflow-y-scroll   flex flex-col justify-center items-center">
            <div className='flex flex-col shadow-2xl rounded-md gap-2 justify-center items-center bg-white p-4 mob:w-[90%]'>

                <div className='flex flex-col justify-center gap-[0.75rem]' >
                    <h1 className='mx-auto text-black text-xl'>Rules Of The Game</h1>
                    <div className='flex flex-col px-8 gap-2'>
                        <ul className='list-disc flex flex-col gap-2'>
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
                        </ul>
                    </div>
                </div>
                <div className='flex justify-center items-center ' >
                    <button className='p-2 py-[5px] bg-[#39853c] text-white rounded-[5px] mt-4' onClick={() => contextData?.dispatch({ type: actionsWords.toggleRules, data: "" })}>Close</button>
                </div>
            </div>
        </div>
    )
}

export default Rules