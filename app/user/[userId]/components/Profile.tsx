"use client"

import Avatar from "@/app/components/Avatar";
import Button from "@/app/components/Button";
import FavoritesModal from "@/app/components/modals/FavoritesModal";
import FollowsModal from "@/app/components/modals/FollowsModal";
import MobileUserInfoModal from "@/app/components/modals/MobileUserInfoModal";
import ProfileEditModal from "@/app/components/modals/ProfileEditModal";
import useFavoritesModal from "@/app/hooks/useFavoritesModal";
import useFollow from "@/app/hooks/useFollow";
import useFollowsModal from "@/app/hooks/useFollowsModal";
import useMobileUserInfo from "@/app/hooks/useMobileUserInfoModal";
import useProfileEdit from "@/app/hooks/useProfileEditModal";
import { SafePost } from "@/app/types";
import { User } from "@prisma/client";
import { signOut } from "next-auth/react";
import React from "react";
import toast from "react-hot-toast";
import { PiDotsThreeVerticalBold } from "react-icons/pi"

interface ProfileProps {
    user: User,
    currentUser: User | null,
    FavoritedQuestions: SafePost[] | null;
    FollowUsers: User[] | null;
}

const Profile: React.FC<ProfileProps> = ({
    user,
    currentUser,
    FavoritedQuestions,
    FollowUsers
}) => {


    const { hasFollowed, toggleFollow } = useFollow(user.id, currentUser);


    const handleSignOut = () => {
        signOut()
            .then(() => {
                toast.success("ログアウトしました")
                window.location.href = "/"
            })
            .catch(() => {
                toast.error("エラーが発生しました")
            })
    }


    const mobileUserInfoModal = useMobileUserInfo();
    const profileEditModal = useProfileEdit();
    const favoritesModal = useFavoritesModal();
    const followModal = useFollowsModal();

    

    return (
        <>
            <MobileUserInfoModal
                user={user}
                currentUser={currentUser}
                FavoriteQuestions={FavoritedQuestions}
                FollowUsers={FollowUsers}
            />
            {currentUser && (
                <ProfileEditModal
                    currentUser={currentUser}
                />
            )}
            <FavoritesModal
                user={user}
                FavoriteQustions={FavoritedQuestions}
                currentUser={currentUser}
            />
            <FollowsModal
                user={user}
                FollowUsers={FollowUsers}
            />
            <div className="bg-white border shadow-none xl:shadow-xl rounded-none xl:rounded-xl p-3 w-full overflow-hidden block max-xl:fixed max-xl:bottom-0 z-30 relative">
                <div className="flex-row items-center gap-2">
                    <div className="py-3">
                        <div>
                            <div className="hidden xl:flex justify-center">
                                <Avatar
                                    user={user}
                                    isBig
                                />
                            </div>
                            <div className="flex justify-center xl:hidden">
                                <Avatar
                                    user={user}
                                />
                            </div>
                        </div>
                        <div className="text-center mt-1 xl:mt-2">
                            <p className="text-md xl:text-2xl font-medium">{user.name}</p>
                            <p className="hidden xl:block text-sm mt-1">{user.description}</p>
                        </div>
                    </div>

                    <div className="hidden xl:flex items-center justify-evenly mt-4">
                        <div 
                        onClick={favoritesModal.onOpen}
                        className=" cursor-pointer hover:text-rose-500 transform duration-150">
                            <p className="text-sm">いいね {FavoritedQuestions?.length}件</p>
                        </div>
                        <div 
                        onClick={followModal.onOpen}
                        className="text-sm cursor-pointer hover:text-sky-500 transform duration-150">
                            <p>フォロー {FollowUsers?.length}人</p>
                        </div>
                    </div>

                    <div className="hidden xl:flex xl:flex-col mt-10">
                        <div>
                            {currentUser && user.id === currentUser.id ? (
                                <div className="space-y-3">
                                    <Button
                                        label="プロフィールを編集"
                                        type="button"
                                        fullWidth
                                        isSmall
                                        onClick={profileEditModal.onOpen}
                                    />
                                    <Button
                                        label="ログアウト"
                                        type="button"
                                        isSecondary
                                        fullWidth
                                        isSmall
                                        onClick={handleSignOut}
                                    />
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {hasFollowed ? (
                                        <div
                                            onClick={toggleFollow}
                                        >
                                            <Button
                                                label="フォロー解除"
                                                type="button"
                                                isSecondary
                                                isSmall
                                                fullWidth
                                                onClick={() => { }}
                                            />
                                        </div>
                                    ) : (
                                        <div
                                            onClick={toggleFollow}
                                        >
                                            <Button
                                                label="フォロー"
                                                type="button"
                                                isSmall
                                                fullWidth
                                                onClick={() => { }}
                                            />
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>


                <div className="absolute xl:hidden top-1 right-1 p-2">
                    <div
                        onClick={() => { mobileUserInfoModal.onOpen() }}
                        className="rounded-full hover:bg-zinc-100 p-1 transform duration-200">
                        <PiDotsThreeVerticalBold size={30} />
                    </div>
                </div>
            </div>
        </>

    )
};

export default Profile;
