import React, { ChangeEvent, FC } from 'react'
import classname from "classnames"
interface ICustomInputProps {
    className?: string
    type: "number" | "text" | "email" | "tel"
    placeHolder?: string
    name: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    value: string | number
    error?: string
    disabled?: boolean
}

export const CustomInput: FC<ICustomInputProps> = ({ className, type, placeHolder, onChange, value, name, error,disabled }) => {
    return (
        <>
            <input type={type} disabled={disabled} name={name} placeholder={placeHolder} value={value} onChange={onChange} className={classname("input input-bordered w-full text-black dark:text-slate-100", className, error && "border-red-700")} />
            {!!error && <span className='text-sm'>{error}</span>}
        </>
    )
} 