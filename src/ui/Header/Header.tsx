import React from 'react'

const Header = () => {
    return (
        <div className=" text-xl relative lg:pt-8 lg:w-8/12 lg:m-auto lg:text-3xl text-center logo mb-4 " >
            <div className="circle1"></div>
            <div className="circle2"></div>
            <h1 className=" font-nunito mb-[10px] lg:mb-[5px] text-white text-[3rem]" >
                WordHash
            </h1>
            <h2 className="text-center -mt-2.5 text-[1rem]  text-white ">Your daily dose of wordplay</h2>
            <div className="circle3"></div>
            <div className="circle4"></div>
        </div>)
}

export default Header