"use client"

import Button from "@/app/components/Button";
import Input from "@/app/components/inputs/Input";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { signIn, useSession } from "next-auth/react"

import { toast } from "react-hot-toast"

const AuthForm = () => {

    const [variantState, setVariantState] = useState<"LOGIN" | "REGISTER">("LOGIN");
    const [isLoading, setIsLoading] = useState(false);

    const session = useSession();

    const router = useRouter();

    const searchParams = useSearchParams();

    const queryVariant = searchParams.get("variant")


    //login or register　判定処理
    useEffect(() => {

        if (queryVariant) {

            if (queryVariant === "login") setVariantState("LOGIN");
            if (queryVariant === "register") setVariantState("REGISTER");

        }

    }, [queryVariant])


    //ログイン時にリダイレクトされる処理
    useEffect(() => {
        if (session?.status === "authenticated") {
            router.push("/")
        }
    }, [session?.status, router])

    //ログイン or 登録の状態を切り替える
    const toggleVariant = useCallback(() => {
        router.push("/auth")
        if (variantState === "LOGIN") {
            setVariantState("REGISTER")
        } else {
            setVariantState("LOGIN")
        }
    }, [variantState])

    const {
        register,
        formState: {
            errors
        },
        handleSubmit
    } = useForm<FieldValues>({
        defaultValues: {
            name: "",
            email: "",
            password: ""
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {

        setIsLoading(true)
        toast.loading("Loading...", { id: "1" })

        if (variantState === "REGISTER") {
            //登録処理
            axios.post("/api/register", data)
                .then(() => {
                    toast.success("アカウントを作成しました!", { id: "1" })
                    signIn("credentials", {
                        ...data,
                        redirect: false
                    })
                        .then(() => {
                            toast.success("ログインに成功しました", { id: "1" })
                            router.push("/");
                            router.refresh()
                        })
                        .finally(() => setIsLoading(false))
                })
                .catch((error) => {
                    console.log(error);
                    toast.error("エラーが発生しました", { id: "1" })
                })
                .finally(() => {
                    setIsLoading(false)
                })
        }

        if (variantState === "LOGIN") {
            //ログイン処理
            signIn("credentials", {
                ...data,
                redirect: false
            })
                .then((callback) => {
                    if (callback?.error) {
                        toast.error("エラーが発生しました", { id: "1" })
                    }
                    if (callback?.ok && !callback?.error) {
                        toast.success("ログインに成功しました", { id: "1" })
                        router.push("/")
                        router.refresh()
                    }
                })
                .finally(() => {
                    setIsLoading(false)
                })
        }

    }

    return (
        <div className="flex-col items-center w-full">
            <div className="w-full mt-3">
                <p className="text-center text-2xl">
                    {variantState === "LOGIN" ? "Mbirthにログイン" : "アカウントを作成"}
                </p>
            </div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="mt-4">
                <div className="flex-col space-y-1">
                    {variantState === "REGISTER" && (
                        <Input
                            label="ユーザーネーム"
                            regiter={register}
                            errors={errors}
                            required
                            disabled={isLoading}
                            id="name"
                        />
                    )}
                    <Input
                        label="メールアドレス"
                        regiter={register}
                        errors={errors}
                        required
                        disabled={isLoading}
                        id="email"
                    />
                    <Input
                        label="パスワード"
                        regiter={register}
                        errors={errors}
                        required
                        disabled={isLoading}
                        id="password"
                        type="password"
                    />
                </div>
                <div className="mt-4">
                    <p
                        onClick={toggleVariant}
                        className="text-center text-blue-700 cursor-pointer hover:opacity-70 transition">
                        {variantState === "LOGIN" ? "新規登録はこちらから" : "ログインはこちらから"}
                    </p>
                </div>
                <div className="mt-5">
                    <Button
                        label={variantState === "LOGIN" ? "ログイン" : "アカウントを作成"}
                        type="submit"
                        onClick={() => { }}
                        fullWidth
                        disabled={isLoading}
                    />
                </div>
            </form>
        </div>
    )
};

export default AuthForm;
