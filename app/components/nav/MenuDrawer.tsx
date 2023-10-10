"use client"

import { Transition, Dialog } from "@headlessui/react";
import Link from "next/link";
import React, { Fragment } from "react";
import { IoClose } from "react-icons/io5"
import { BsBoxArrowUpRight } from "react-icons/bs"
import { User } from "@prisma/client"
import Button from "../Button";
import Avatar from "../Avatar";
import usePostModal from "@/app/hooks/usePostModal";
import { useRouter } from "next/navigation";

interface MenuDrawerProps {
    isOpen?: boolean;
    onClose: () => void;
    currentUser: User | null;
}

const MenuDrawer: React.FC<MenuDrawerProps> = ({
    isOpen,
    onClose,
    currentUser
}) => {

    const postModal = usePostModal();

    const router = useRouter()

    return (
        <div>
            <Transition.Root
                show={isOpen}
                as={Fragment}
            >
                <Dialog
                    as="div"
                    className="relative z-50"
                    onClose={()=>{}}
                >
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-500"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-500"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-40" />
                    </Transition.Child>
                    <div className="fixed inset-0 overflow-hidden">
                        <div className="fixed inset-0 overflow-hidden">
                            <div className=" pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                                <Transition.Child
                                    as={Fragment}
                                    enter="transform transition ease-in-out duration-500"
                                    enterFrom="translate-x-full"
                                    enterTo="translate-x-0"
                                    leave="transform transition ease-in-out duration-500"
                                    leaveFrom="translate-x-0"
                                    leaveTo="translate-x-full"
                                >
                                    <Dialog.Panel className=" pointer-events-auto w-screen max-w-md">
                                        <div className="flex h-full flex-col overflow-y-scroll bg-zinc-800 py-6 shadow-xl relative">

                                            <div className="px-4 sm:px-6">
                                                <div className="flex items-start justify-end">
                                                    <div className="ml-3 flex h-7 items-center">
                                                        <button
                                                            type="button"
                                                            className="rounded-md bg-zinc-800 text-white hover:text-zinc-500 transition focus:outline-none
                                                        focus:ring-2 
                                                        "
                                                            onClick={onClose}
                                                        >
                                                            <span className=" sr-only">
                                                                Close menu
                                                            </span>
                                                            <IoClose size={24} aria-hidden="true" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="px-5 mt-10">
                                                <div className="flex  justify-center">
                                                    <div className="flex flex-col items-start gap-10">

                                                        {/* routes */}

                                                        {currentUser ? (
                                                            <>
                                                                <div className=" cursor-pointer"
                                                                onClick={()=>{router.push(`/user/${currentUser.id}`)}}
                                                                >
                                                                    <div className="flex">
                                                                        <Avatar
                                                                        user={currentUser}
                                                                        />
                                                                        <div className="ml-3">
                                                                            <p className="text-white font-light text-xl">{currentUser.name}</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    className="cursor-pointer"
                                                                >
                                                                    <div className="flex justify-start">
                                                                        <Button
                                                                        label="投稿する"
                                                                        onClick={()=>{postModal.onOpen()}}
                                                                        type="button"
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <Link
                                                                    href="/auth/?variant=register"
                                                                >
                                                                    <div className="flex justify-start">
                                                                        <div className="text-white font-normal text-xl">
                                                                            <p className="flex items-center gap-2 hover:text-zinc-400 transform duration-200">
                                                                                会員登録
                                                                                <span>
                                                                                    <BsBoxArrowUpRight size={20} />
                                                                                </span>
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </Link>

                                                                <Link
                                                                    href="/auth/?variant=login"
                                                                >
                                                                    <div className="flex justify-start">
                                                                        <div className="text-white font-normal text-xl">
                                                                            <p className="flex items-center gap-2 hover:text-zinc-400 transform duration-200">
                                                                                ログイン
                                                                                <span>
                                                                                    <BsBoxArrowUpRight size={20} />
                                                                                </span>
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </Link>
                                                            </>
                                                        )}

                                                    </div>
                                                </div>
                                            </div>

                                            <div className=" absolute bottom-1 right-1">
                                                <div className="pr-3">
                                                    <p className="text-white font-light">
                                                        ©Mbirth 2023
                                                    </p>
                                                </div>
                                            </div>

                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </div>
    )
};

export default MenuDrawer;
