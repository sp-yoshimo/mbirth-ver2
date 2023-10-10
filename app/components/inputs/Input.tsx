"use client"

import React from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps {
    label: string;
    required?: boolean;
    type?: string;
    id: string;
    errors: FieldErrors
    disabled?: boolean;
    isBig?: boolean;
    regiter: UseFormRegister<FieldValues>
}

const Input: React.FC<InputProps> = ({
    label,
    regiter,
    required,
    type,
    id,
    errors,
    disabled,
    isBig
}) => {
    return (
        <div className="w-full">
            {isBig ? (
                <textarea
                    disabled={disabled}
                    id={id}
                    autoComplete={id}
                    {...regiter(id, { required })}
                    placeholder={label}
                    className={`
                w-full outline-none focus:outline-none px-4 py-2 rounded-lg border border-gray-300 ring-0 focus:ring-4 transition resize-none
                 h-36
                `}
                />
            ) : (
                <input
                    type={type}
                    disabled={disabled}
                    id={id}
                    autoComplete={id}
                    {...regiter(id, { required })}
                    placeholder={label}
                    className={`
            w-full outline-none focus:outline-none px-4 py-2 rounded-lg border border-gray-300 ring-0 focus:ring-4 transition
            `}
                />
            )}
        </div>
    )
};

export default Input;
