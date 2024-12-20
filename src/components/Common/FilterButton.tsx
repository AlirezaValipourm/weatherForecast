import React, { FC } from 'react'

interface IFilterButtonProps {
    isSelected: boolean;
    label: string
    onClick: () => void
}

export const FilterButton: FC<IFilterButtonProps> = ({ isSelected, label, onClick }) => {
    return (
        <button
            onClick={onClick}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors duration-150 ${isSelected
                ? 'bg-blue-200 text-blue-700 hover:bg-blue-200'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-200'
                }`}
        >
            {label}
        </button>
    );
};