"use client"

import React from "react";
import { IconType } from "react-icons";

interface SidebarItemProps{
    label: string;
    onClick: () => void
    selected?: boolean,
    icon: IconType
}

const SidebarItem: React.FC<SidebarItemProps> = ({
    label,
    onClick,
    selected,
    icon:Icon
}) => {
    return(
        <div
        onClick={onClick}
        className={`w-full h-20 hover:bg-neutral-100 flex items-center p-5 rounded-lg cursor-pointer transition
        ${selected && "border-[1px] border-sky-400 hover:bg-white"}
        `}
        >
            <div className="flex items-center">
                <Icon 
                className="mr-2"
                />
                <p className="text-xl font-bold">
                    {label}
                </p>
            </div>
        </div>
    )
};

export default SidebarItem;
