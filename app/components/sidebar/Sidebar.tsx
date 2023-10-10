import React, { useEffect, useState } from "react";
import SidebarItem from "./SidebarItem";
import { useRouter } from "next/navigation";
import { BsStars } from "react-icons/bs"
import { AiFillHeart } from "react-icons/ai"
import { BiWorld } from "react-icons/bi"
import { FaUserCheck } from "react-icons/fa"
import useQueryMode from "@/app/hooks/useQueryMode";
import Button from "../Button";

const Sidebar = () => {

    const query = useQueryMode();

    const router = useRouter()


    const routes = [
        {
            label: "新しい投稿",
            action: () => {
                query.onNew()
                router.refresh();
            },
            id: "new",
            icon: BsStars
        },
        {
            label: "人気の投稿",
            action: () => {
                query.onPopular();
                router.refresh();
            },
            id: "popular",
            icon: AiFillHeart
        },
        {
            label: "古い投稿",
            action: () => {
                query.onOld();
                router.refresh();
            },
            id: "old",
            icon: BiWorld
        },
        {
            label: "フォローの投稿",
            action: () => {
                query.onFollows()
                router.refresh();
            },
            id: "follows",
            icon: FaUserCheck
        },

    ]

    return (
        <div className="overflow-y-hidden w-full">
            <div className="w-full px-2 2xl:px-8 mt-10 flex justify-start">
                <div className="flex flex-col w-full">

                    {routes.map((item) => (
                        <SidebarItem
                            key={item.id}
                            label={item.label}
                            icon={item.icon}
                            onClick={() => { item.action() }}
                            selected={query.mode === item.id}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
};

export default Sidebar;
