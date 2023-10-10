"use client"

import React from "react";
import Button from "./Button";
import { useRouter } from "next/navigation";
import IntroImg from "@/public/images/intro.jpg"
import Image from "next/image";

const Intro = () => {

    const router = useRouter();

    return (
        <div className="w-full lg:w-5/6 xl:w-3/5  h-auto p-5">
            <div className="flex flex-col md:flex-row items-center justify-around w-full gap-10">
                <div className="flex-col justify-start items-start w-full md:w-1/2">
                    <div>
                        <h1 className="text-4xl lg:text-[60px] font-bold leading-[3rem] lg:leading-[3.5rem]">Mbirthで幅広い視点の問題に挑め</h1>
                    </div>
                    <p className=" mt-3 font-thin text-xl">
                        作成した数学・算数の問題を投稿して、世界中に発信することができます。
                        投稿以外にも、 誰かが作成した問題を解くこともできます。
                        お気に入りの問題にはいいねをしたり、お気に入りのユーザーをフォロー
                        したりしましょう！今すぐ会員登録・ログイン！
                    </p>
                    <div className="flex flex-col lg:flex-row items-center mt-5 gap-5">
                        <Button
                        type="button"
                        onClick={() => {router.push("/auth?variant=register")}}
                        label="会員登録"
                        responcive
                        />
                        <Button
                        type="button"
                        onClick={() => {router.push("/auth?variant=login")}}
                        label="登録済みの方はログイン"
                        isSecondary
                        responcive
                        />
                    </div>
                </div>
                <div className="w-full md:w-1/2">
                    <div className="w-full">
                        <Image
                        src={IntroImg}
                        alt="introImg"
                        className=" object-cover"
                        draggable={false}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Intro;
