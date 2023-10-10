"use client"

import React, { useEffect } from "react";
import useFavoritesModal from "../hooks/useFavoritesModal";
import useLoginWarnModal from "../hooks/useLoginWarnModal";
import useMobileUserInfo from "../hooks/useMobileUserInfoModal";
import usePostModal from "../hooks/usePostModal";
import useProfileEdit from "../hooks/useProfileEditModal";
import useFollowsModal from "../hooks/useFollowsModal";
import useQuestionEditModal from "../hooks/useQuestionEditModal";
import useQuestionDeleteModal from "../hooks/useQuestionDeleteModal";

const ModalCloseContext = () => {

    const FavoritesModal = useFavoritesModal();
    const loginWarnModal = useLoginWarnModal();
    const MobileUserInfoModal = useMobileUserInfo();
    const postModal = usePostModal();
    const profileEditModal = useProfileEdit();
    const favoriteQuestionsModal = useFavoritesModal();
    const followsModal = useFollowsModal();
    const questionEditModal = useQuestionEditModal();
    const questionDeleteModal = useQuestionDeleteModal();


    useEffect(() => {

        FavoritesModal.onClose();
        loginWarnModal.onClose();
        MobileUserInfoModal.onClose();
        postModal.onClose();
        profileEditModal.onClose();
        favoriteQuestionsModal.onClose();
        followsModal.onClose();
        questionEditModal.onClose();
        questionDeleteModal.onClose();


    }, [FavoritesModal,
        loginWarnModal,
        MobileUserInfoModal,
        postModal,
        profileEditModal,
        favoriteQuestionsModal,
        followsModal,
        questionDeleteModal,
        questionEditModal])

    return (
        <div></div>
    )
};

export default ModalCloseContext;
