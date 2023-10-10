import React from "react";
import Modal from "./Modal";
import useMobileUserInfo from "@/app/hooks/useMobileUserInfoModal";
import { Post, User } from "@prisma/client";
import Avatar from "../Avatar";
import Button from "../Button";
import useProfileEdit from "@/app/hooks/useProfileEditModal";
import { signOut } from "next-auth/react";
import toast from "react-hot-toast";
import useFavoritesModal from "@/app/hooks/useFavoritesModal";
import useFollowsModal from "@/app/hooks/useFollowsModal";
import useFollow from "@/app/hooks/useFollow";

interface MobileUserInfoModalProps {
    user: User,
    currentUser: User | null,
    FavoriteQuestions: Post[] | null;
    FollowUsers: User[] | null;
}

const MobileUserInfoModal: React.FC<MobileUserInfoModalProps> = ({
    user,
    currentUser,
    FavoriteQuestions,
    FollowUsers
}) => {

    const mobileUserInfoModal = useMobileUserInfo();
    const profileEditModal = useProfileEdit();
    const favoritesModal = useFavoritesModal();
    const followModal = useFollowsModal();


    const handleEdit = () => {
        profileEditModal.onOpen();
        mobileUserInfoModal.onClose();
    }


    const handleShowFavorites = () => {
        favoritesModal.onOpen();
        mobileUserInfoModal.onClose()
    }

    const handleShoeFollows = () => {
        followModal.onOpen();
        mobileUserInfoModal.onClose()
    }

    const { hasFollowed, toggleFollow } = useFollow(user.id);

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

    return (
        <Modal
            isOpen={mobileUserInfoModal.isOpen}
            onClose={() => { mobileUserInfoModal.onClose() }}
        >
            {user && (
                <div className="flex items-center gap-2">
                    <div className="pt-3 md:pt-0">
                        <div className="flex items-start">
                            <Avatar
                                user={user}
                            />
                            <div className="ml-3">
                                <p className="text-xl font-bold">{user.name}</p>
                                <p className="text-sm font-normal">{user.description}</p>
                                <div className="mt-5 flex">
                                    <div
                                        onClick={handleShowFavorites}
                                        className="cursor-pointer hover:text-rose-500 transform duration-150">
                                        <p>いいね {FavoriteQuestions?.length}件</p>
                                    </div>
                                    <div
                                        onClick={handleShoeFollows}
                                        className="cursor-pointer hover:text-sky-500 transform duration-150 ml-5 md:ml-8">
                                        <p>フォロー {FollowUsers?.length}人</p>
                                    </div>
                                </div>
                                <div className="flex mt-8 gap-4 items-center">
                                    {user.id === currentUser?.id ? (
                                        <>
                                            <Button
                                                label="編集する"
                                                type="button"
                                                isSmall
                                                onClick={handleEdit}
                                            />
                                            <Button
                                                label="ログアウト"
                                                type="button"
                                                isSecondary
                                                isSmall
                                                onClick={handleSignOut}
                                            />
                                        </>
                                    ) : (
                                        <>
                                            {hasFollowed ? (
                                                <div
                                                    onClick={toggleFollow}
                                                >
                                                    <Button
                                                        label="フォロー解除"
                                                        type="button"
                                                        isSmall
                                                        isSecondary
                                                        onClick={() => { }}
                                                    />
                                                </div>
                                            ) : (
                                                <div
                                                onClick={toggleFollow}
                                                >
                                                    <Button
                                                        label="フォローする"
                                                        type="button"
                                                        isSmall
                                                        onClick={() => { }}
                                                    />
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            )}
        </Modal>
    )
};

export default MobileUserInfoModal;
