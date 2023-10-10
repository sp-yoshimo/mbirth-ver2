"use client"

import React from "react";
import { BsStars } from "react-icons/bs"
import { AiFillHeart } from "react-icons/ai"
import { BiWorld } from "react-icons/bi"
import { FaUserCheck } from "react-icons/fa"
import useQueryMode from "@/app/hooks/useQueryMode";
import MobileSidebarItem from "./MobileSidebarItem";
import { useRouter } from "next/navigation";

const MobileSidebar = () => {

    const query = useQueryMode();
    const router = useRouter();

    const routes = [
        {
            label: "新しい投稿",
            mobileLabel: "最新",
            action: ()=>{
                query.onNew();
                router.refresh();
            },
            id: "new",
            icon: BsStars
        },
        {
            label: "人気の投稿",
            mobileLabel: "人気",
            action: ()=>{
                query.onPopular()
                router.refresh();
            },
            id: "popular",
            icon: AiFillHeart
        },
        {
            label: "古い投稿",
            mobileLabel: "古い",
            action: ()=>{
                query.onOld();
                router.refresh();
            },
            id: "old",
            icon: BiWorld
        },
        {
            label: "フォローの投稿",
            mobileLabel: "フォロー",
            action: ()=>{
                query.onFollows();
                router.refresh();
            },
            id: "follows",
            icon: FaUserCheck
        },

    ]

    return (
        <div className=" bg-zinc-800 h-auto w-full px-1 py-3">
            <div className="flex items-center justify-between w-full">
                {routes.map((item) => (
                    <MobileSidebarItem
                        icon={item.icon}
                        action={item.action}
                        selected={query.mode === item.id}
                        label={item.mobileLabel}
                        key={item.id}
                    />
                ))}
            </div>
        </div>
    )
};

export default MobileSidebar;
