"use client";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import * as RadixSelect from "@radix-ui/react-select";

interface SelectProps {
  triggerStyles?: string;
  contentStyles?: string;
  defaultSelected?: string;
  onValueChange: (value: string) => void;
  selectList: { value: string; item: string }[];
  value?: string;
  placeholder?: string;
  disabled?: boolean;
}

const Select = ({
  defaultSelected,
  onValueChange,
  selectList,
  contentStyles,
  triggerStyles,
  value,
  placeholder,
  disabled,
}: SelectProps) => {
  return (
    <RadixSelect.Root
      disabled={disabled}
      value={value}
      defaultValue={defaultSelected}
      onValueChange={onValueChange}>
      <RadixSelect.Trigger
        className={`${triggerStyles} outline-none border w-full rounded-lg py-1 px-3 flex justify-between shadow-sm`}>
        <RadixSelect.Value
          className='text-white text-center placeholder:text-neutral-600'
          placeholder={placeholder}
        />
        <RadixSelect.Icon className=' ml-1 '>
          <ChevronDownIcon width={25} color='' />
        </RadixSelect.Icon>
      </RadixSelect.Trigger>
      <RadixSelect.Portal>
        <RadixSelect.Content
          className={` ${contentStyles} shadow-lg z-50 overflow-hidden rounded-xl border border-neutral-200`}>
          <RadixSelect.Viewport className=''>
            {selectList.map((selectItem) => (
              <RadixSelect.Item
                key={selectItem.value}
                value={selectItem.value}
                className='py-2 px-3 text-black hover:bg-white
                 hover:text-ews cursor-pointer text-base outline-none'>
                <RadixSelect.ItemText>{selectItem.item}</RadixSelect.ItemText>
              </RadixSelect.Item>
            ))}
          </RadixSelect.Viewport>
        </RadixSelect.Content>
      </RadixSelect.Portal>
    </RadixSelect.Root>
  );
};

export default Select;
