"use client"

import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import MenuButton from "./MobileMenuButton";
import { User } from "@prisma/client"
import Button from "../Button";
import Avatar from "../Avatar";
import usePostModal from "@/app/hooks/usePostModal";

interface NavProps {
    currentUser: User | null
}

const Nav: React.FC<NavProps> = ({
    currentUser
}) => {

    const router = useRouter();

    const postModal = usePostModal();


    return (
        <div className=" bg-zinc-800 fixed w-full h-auto p-2 sm:p-4 px-5 md:px-0 z-50 max-h-20">
            <div className="w-full md:w-4/6 mx-auto">
                <div className="flex items-center justify-between">
                    <div
                        onClick={() => { router.push("/") }}
                        className=" cursor-pointer"
                    >
                        <h1 className="text-white text-2xl sm:text-3xl font-bold">Mbirth</h1>
                    </div>
                    <ul className="gap-10 items-center hidden md:flex">
                        {currentUser ? (
                            <>
                                <li className="text-white">
                                    <Button
                                        label="投稿する"
                                        onClick={() => {postModal.onOpen()}}
                                        type="button"
                                        isSmall
                                    />
                                </li>
                                <li className="">
                                    <div className="flex items-center">
                                        <Avatar
                                            user={currentUser}
                                            onClick={() => { router.push(`/user/${currentUser.id}`) }}
                                        />
                                        <div className="ml-3">
                                            <p className="text-white font-light">{currentUser.name}</p>
                                        </div>
                                    </div>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="text-white hover:text-slate-400 transition font-medium">
                                    <Link
                                        href="/auth?variant=register"
                                    >
                                        会員登録
                                    </Link>
                                </li>
                                <li className="text-white hover:text-slate-400 transition font-medium">
                                    <Link
                                        href="/auth?variant=login"
                                    >
                                        ログイン
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                    <div className="block md:hidden">
                        <MenuButton
                            currentUser={currentUser}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Nav;
