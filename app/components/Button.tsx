"use client"

import React from "react";

interface ButtonProps {
    label: string;
    type: "submit" | "button" | "reset" | undefined;
    isDanger?: boolean;
    isSecondary?: boolean;
    fullWidth?: boolean;
    disabled?: boolean;
    onClick: () => void;
    isSmall?: boolean,
    responcive?: boolean;
}

const Button: React.FC<ButtonProps> = ({
    label,
    type,
    isDanger,
    isSecondary,
    fullWidth,
    onClick,
    isSmall,
    responcive,
    disabled
}) => {
    return (
        <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`
         rounded-md outline-none focus:outline-none focus:ring-4 ring-blue-300 hover:scale-[1.03] transition
          disabled:cursor-not-allowed disabled:opacity-60
         ${isDanger ? "bg-rose-500 ring-rose-400" : "bg-blue-500"}
         ${isSecondary ? "bg-transparent border border-gray-500 text-black ring-neutral-200" : "border-none text-white"}
         ${fullWidth && "w-full"}
         ${isSmall ? "text-sm px-5 py-2" : "px-7 py-3"}
         ${responcive && "w-full lg:w-auto"}
         ${disabled && " cursor-not-allowed opacity-60"}
         
        `}
        >
            {label}
        </button>
    )
};

export default Button;
