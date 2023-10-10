import React, { useState } from "react";
import Modal from "./Modal";
import useProfileEdit from "@/app/hooks/useProfileEditModal";
import Header from "../Header";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { CldUploadButton } from "next-cloudinary";
import Image from "next/image";
import { User } from "@prisma/client";
import Button from "../Button";
import axios from "axios";
import toast from "react-hot-toast";
import Input from "../inputs/Input";
import Avatar from "../Avatar";
import { useRouter } from "next/navigation";

interface ProfileEditModalProps {
    currentUser: User
}

const ProfileEditModal: React.FC<ProfileEditModalProps> = ({
    currentUser
}) => {


    const profileEditModal = useProfileEdit();
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const {
        register,
        watch,
        handleSubmit,
        setValue,
        formState: {
            errors
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: currentUser.name,
            description: currentUser.description,
            image: currentUser.image
        }
    })

    const image = watch("image");

    const ImageUpload = (result: any) => {
        setValue("image", result.info.secure_url)
    }

    const onSubmit: SubmitHandler<FieldValues> = (data) => {

        toast.loading("更新中...", { id: "1" });
        setIsLoading(true);

        axios.put(`/api/user/${currentUser.id}`, data)
            .then(() => {
                router.refresh()
                toast.success("更新しました", { id: "1" });
                profileEditModal.onClose();
            })
            .catch((error) => {
                toast.error("エラーが発生しました", { id: "1" });
                console.log(error)
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    return (
        <Modal
            isOpen={profileEditModal.isOpen}
            onClose={profileEditModal.onClose}
        >
            <div>
                <Header
                    title="プロフィールを編集"
                />
                <div className="w-full mt-5">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <div className="flex-col space-y-8">
                            <div>
                                <div>
                                    <p className="mb-4 text-lg">アイコン</p>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <div>
                                        <Image
                                            src={image || currentUser.image || "/images/placeholder.jpg"}
                                            width={80}
                                            height={80}
                                            alt="icon"
                                        />
                                    </div>
                                    <CldUploadButton
                                        onUpload={ImageUpload}
                                        options={{
                                            maxFiles: 1
                                        }}
                                        uploadPreset="b6ujnnl4"
                                    >
                                        <Button
                                            label="change"
                                            type="button"
                                            isSecondary
                                            isSmall
                                            onClick={() => { }}
                                            disabled={isLoading}
                                        />
                                    </CldUploadButton>
                                </div>
                            </div>
                            <div className="flex-col items-start">
                                <p className="mb-2 text-lg">名前</p>
                                <Input
                                    label=""
                                    id="name"
                                    regiter={register}
                                    type="text"
                                    errors={errors}
                                    disabled={isLoading}
                                />
                            </div>
                            <div className="flex-col items-start">
                                <p className="mb-2 text-lg">自己紹介</p>
                                <Input
                                    label=""
                                    id="description"
                                    regiter={register}
                                    type="text"
                                    errors={errors}
                                    isBig
                                    disabled={isLoading}
                                />
                            </div>
                        </div>
                        <div className="mt-5 flex flex-col md:flex-row justify-end gap-3">
                            <Button
                                label="キャンセル"
                                type="button"
                                onClick={profileEditModal.onClose}
                                isSecondary
                                responcive
                                disabled={isLoading}
                            />
                            <Button
                                label="更新"
                                type="submit"
                                onClick={() => { }}
                                responcive
                                disabled={isLoading}
                            />
                        </div>
                    </form>
                </div>
            </div>
        </Modal>
    )
};

export default ProfileEditModal;
