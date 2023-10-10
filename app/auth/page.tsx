import Image from "next/image";
import logo from "@/public/images/logo.png"
import AuthForm from "./components/AuthForm";
import Nav from "../components/nav/Nav";
import getCurrentUser from "../actions/getCurrentUser";

export default async function Auth() {

    const currentUser = await getCurrentUser();
    
    return (
        <>
            <Nav
            currentUser={currentUser}
            />
            <div className="flex w-full h-screen bg-zinc-100 justify-center items-center">
                <div className="flex flex-col items-center p-5 w-full lg:w-1/2 xl:w-1/4  2xl:w-1/5">
                    <Image
                        src={logo}
                        alt="logo"
                        width={120}
                        height={120}
                    />
                    <AuthForm />
                </div>

            </div>
        </>

    )
}