"use client";

import { User } from "@prisma/client";
import Image from "next/image";
import React from "react";

interface AvatarProps {
    user: User | null,
    onClick?: () => void;
    isSmall?: boolean;
    isBig?: boolean
}

const Avatar: React.FC<AvatarProps> = ({
    user,
    onClick,
    isSmall,
    isBig
}) => {
    return (
        <div>
            {user && (
                <div className="flex inset-0">
                    <div
                        onClick={onClick ? onClick : () => { }}
                        className={`relative inline-block rounded-full overflow-hidden cursor-pointer
                    ${isSmall ? "h-4 w-4" : "h-9 w-9"}
                    ${isBig ? "h-24 w-24" : "h-9 w-9"}
                    `}>
                        <Image
                            src={user.image ? user.image : "/images/placeholder.jpg"}
                            alt="avatar"
                            fill
                            className=" object-cover"
                        />
                    </div>
                </div>
            )}
        </div>
    )
};

export default Avatar;
