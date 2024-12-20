import { Item } from '@/jobApp/types/models/Item';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';
import { RiCloseFill } from "react-icons/ri";

interface ItemsSelectorProps {
  availableItems: Item[];
  selectedItems: Item[];
  onChange: (items: Item[]) => void;
  max?: number;
  label: string
  error?: string | string[]
  disabled?: boolean
}

export const ItemSelector: React.FC<ItemsSelectorProps> = ({
  onChange,
  max = 10,
  availableItems,
  selectedItems,
  label,
  error,
  disabled
}) => {
  const t = useTranslations()
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const remainingItems = availableItems.filter(
    item => !selectedItems.some(selected => selected.id === item.id)
  );

  const filteredItems = remainingItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectItem = (item: Item) => {
    if (selectedItems.length < max) {
      onChange([...selectedItems, item]);
      setSearchTerm('');
      setIsOpen(false);
    }
  };

  const handleRemoveItem = (ItemToRemove: Item) => {
    onChange(selectedItems.filter(item => item.id !== ItemToRemove.id));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !searchTerm && selectedItems.length > 0) {
      handleRemoveItem(selectedItems[selectedItems.length - 1]);
    }
  };
  const mainError = Array.isArray(error) ? error[0] : error

  return (
    <div className="relative w-full visible ">
      <label className="block text-sm font-medium text-gray-700 dark:text-slate-100 mb-2 ">
        {label} ({selectedItems.length}/{max})
      </label>
      <div
        className={`overflow-x-hidden flex items-center border-[1px] input-bordered input min-h-[42px] w-full rounded-lg px-2 py-1 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 ${isOpen ? 'border-blue-500' : ''
          } ${!!mainError && "border-red-600"}`}
        onClick={() => setIsOpen(true)}
      >
        <div className="flex flex-wrap gap-2 w-full relative my-auto">
          {selectedItems.map(item => (
            <span
              key={item.id}
              className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-md"
            >
              {item.name}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveItem(item);
                }}
                className="ml-1 hover:text-blue-600 focus:outline-none"
              >
                <RiCloseFill className="w-4 h-4" />
              </button>
            </span>
          ))}
          <input
            disabled={disabled}
            type="text"
            className="flex-1 outline-none w-full min-w-[120px] h-full text-sm"
            placeholder={selectedItems.length === 0 ? t("search_skills") : ""}
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setIsOpen(true);
            }}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsOpen(true)}
          />
        </div>
      </div>
      {!!mainError && <span className='text-sm'>{error}</span>}

      {isOpen && (
        <>
          <div
            className="fixed inset-0"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 max-h-60 overflow-auto">
            {filteredItems.length > 0 ? (
              <ul className="py-1">
                {filteredItems.map(item => (
                  <li
                    key={item.id}
                    className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                    onClick={() => handleSelectItem(item)}
                  >
                    <div className="font-medium">{item.name}</div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="px-3 py-2 text-sm text-gray-500">
                {t("no_skills")}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};