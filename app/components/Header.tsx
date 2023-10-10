"use client"

import React from "react";

interface HeaderProps{
    title: string;
    subtitle?: string
}

const Header: React.FC<HeaderProps> = ({
    title,
    subtitle
}) => {
    return(
        <div className="p-3 sm:p-1">
            <div className="flex flex-col items-start">
                <p className="text-black font-bold text-xl sm:text-2xl">{title}</p>
                <p className=" text-zinc-800 font-light text-md sm:text-lg mt-2">{subtitle}</p>
            </div>
        </div>
    )
};

export default Header;
