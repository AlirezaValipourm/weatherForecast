import React, { useState, useEffect, useRef, FC } from 'react';
import { Loading } from './Loading';
import { useTranslations } from 'next-intl';

export interface Option {
    value: string;
    label: string;
}

interface SearchableSelectProps {
    options: Option[];
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
    disabled?: boolean;
    loading?: boolean;
    onSearch: (query: string) => void;
    searchTerm: string;
}

export const SearchLocation: FC<SearchableSelectProps> = ({
    options,
    value,
    onChange,
    placeholder = '',
    className = '',
    disabled = false,
    loading = false,
    onSearch,
    searchTerm
}) => {
    const t = useTranslations()
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [filteredOptions, setFilteredOptions] = useState<Array<Option>>(options);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const selectedLabel = options.find(opt => opt.value === value)?.label;

    // Filter options based on search term
    useEffect(() => {
        const filtered = options.filter(option =>
            option.label.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredOptions(filtered);
    }, [searchTerm, options]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (selectedValue: string) => {
        onChange(selectedValue);
        setIsOpen(false);
    };


    return (
        <div className={`relative ${className}`} ref={dropdownRef}>
            <div
                className={`dropdown w-full ${isOpen ? 'dropdown-open' : ''}`}
                onClick={() => !disabled && !loading && setIsOpen(!isOpen)}
            >
                <div
                    tabIndex={0}
                    className={`btn btn-block bg-gray-100 dark:bg-gray-500 justify-between ${disabled || loading ? 'btn-disabled' : ''}`}
                >
                    {loading ? (
                        <div className="flex items-center space-x-2">
                            <div className="text-gray-700 dark:text-gray-400 w-4 h-4 border-2 border-base-content/20 border-t-base-content/60 rounded-full animate-spin"></div>
                            <span>{t("loading")}</span>
                        </div>
                    ) : (
                        <span className="truncate text-gray-700 dark:text-gray-400">
                            {selectedLabel || placeholder}
                        </span>
                    )}
                    <span className={`transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
                        ▼
                    </span>
                </div>
            </div>

            {/* Dropdown menu */}
            {isOpen && (
                <div className="absolute z-50 w-full mt-1 bg-gray-200 dark:bg-gray-600 rounded-box shadow-lg border border-base-300">
                    <div className="p-2">
                        <input
                            type="text"
                            className="input input-bordered w-full text-gray-700 dark:text-gray-400"
                            placeholder={t("search")}
                            value={searchTerm}
                            onChange={(e) => {
                                onSearch(e.target.value);
                            }}
                            onClick={(e) => e.stopPropagation()}
                            autoFocus
                        />
                    </div>

                    <ul className="max-h-60 overflow-auto">
                        {loading ? (
                            <Loading size='md' />
                        ) : filteredOptions.length === 0 ? (
                            <li className="p-4 text-center text-base-content/60">
                                {t("no_options")}
                            </li>
                        ) : (
                            filteredOptions.map((option) => (
                                <li
                                    key={option.value}
                                    className={`px-4 py-2 text-gray-700 dark:text-gray-400 hover:bg-gray-300 cursor-pointer ${option.value === value ? 'bg-primary/10' : ''
                                        }`}
                                    onClick={() => handleSelect(option.value)}
                                >
                                    {option.label}
                                </li>
                            ))
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
};