"use client"

import React from "react";
import Modal from "./Modal";
import useLoginWarnModal from "@/app/hooks/useLoginWarnModal";
import Header from "../Header";
import Button from "../Button";
import { useRouter } from "next/navigation";


const LoginWarnModal = () => {

    const loginWarnModal = useLoginWarnModal();

    const router = useRouter();

    const handleClick = () => {
        loginWarnModal.onClose()
        router.push("/auth/?variant=login");
    }

    return (
        <Modal
            isOpen={loginWarnModal.isOpen}
            onClose={loginWarnModal.onClose}
        >
            <div>
                <Header
                title="Mbirthへようこそ"
                subtitle="ログインしてMbirthを楽しもう"
                />
                <div className="mt-10">
                    <div className="flex gap-4 justify-end items-center">
                        <Button
                        label="キャンセル"
                        onClick={()=>{loginWarnModal.onClose()}}
                        type="button"
                        isSecondary
                        />
                        <Button
                        label="ログイン"
                        onClick={handleClick}
                        type="button"
                        />
                    </div>
                </div>
            </div>
        </Modal>
    )
};

export default LoginWarnModal;
