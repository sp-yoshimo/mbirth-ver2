"use client"

import React, { useCallback, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai"
import MenuDrawer from "./MenuDrawer";
import { User } from "@prisma/client"


interface MobileMenuButtonProps{
    currentUser: User | null
}

const MenuButton: React.FC<MobileMenuButtonProps> = ({
    currentUser
}) => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = useCallback(() => {
        setIsMenuOpen((current) => !current)
    }, [])

    const onClose = () => {
        setIsMenuOpen(false);
    }

    return (
        <>
            <div
                onClick={toggleMenu}
                className="flex items-center justify-center bg-zinc-700/60 p-2 rounded-md cursor-pointer hover:bg-zinc-700/80 transform duration-200">
                <AiOutlineMenu
                    size={30}
                />
            </div>
            <MenuDrawer
            isOpen={isMenuOpen}
            onClose={onClose}
            currentUser={currentUser}
            />
        </>
    )
};

export default MenuButton;
