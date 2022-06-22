import React from 'react'
import { Link } from 'react-router-dom'
import { MdOutlineLeaderboard, MdPersonAdd } from "react-icons/md"
import { CgNotes } from 'react-icons/cg'
import { FiHelpCircle } from "react-icons/fi"


const BottomNav: React.FC = () => {
    return (
        <div className=' lg:w-1/2 rounded-xl bg-gradient-to-br from-[#4bcfff] to-[#059ff9]" flex flex-row justify-evenly mt-2  p-2'>

            <div className='flex flex-col bg-white justify-center items-center shadow-2xl p-2 rounded-xl shadow-black/50'>
                <Link to={`/`} className=" flex flex-col justify-center items-center">
                    <MdPersonAdd />
                    <span>Sign up</span>
                </Link>
            </div>
            <div
                className='flex flex-col bg-white justify-center items-center shadow-2xl p-2 rounded-xl shadow-black/50'
            >
                <Link to={`/`}
                    className=" flex flex-col justify-center items-center    "
                >
                    <CgNotes />
                    <span>Terms</span>
                </Link>
            </div>
            <div
                className='flex flex-col bg-white justify-center items-center shadow-2xl p-2 rounded-xl shadow-black/50'
            >
                <Link to={`/`}
                    className=" flex flex-col justify-center items-center"
                >
                    <MdOutlineLeaderboard />
                    <span>Leaderboard</span>
                </Link>
            </div>
            <div
                className='flex flex-col justify-center bg-white items-center shadow-2xl p-2 rounded-xl shadow-black/50'
            >
                <Link to={`/`}
                    className=" flex flex-col justify-center items-center"
                >
                    <FiHelpCircle />
                    <span>Help</span>
                </Link>
            </div>



        </div>
    )
}

export default BottomNav