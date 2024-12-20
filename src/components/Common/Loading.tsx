import React, { FC } from 'react'

interface ILoadingProps {
    size?: "sm" | "md" | "lg" | "xl" | "full"
}

export const Loading: FC<ILoadingProps> = ({ size = "xl" }) => {
    return (
        <span className={`loading loading-spinner loading-${size} ${size == "full" && "h-[100px] w-[100px]"}`} />
    )
}
