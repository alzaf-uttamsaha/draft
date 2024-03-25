  const [tableBodyData, setTableBodyData] = useState([])

  const onSubmit = (data) => {
    console.log("on submit ")
    setTableBodyData(prevData => [
      ...prevData,
      {
        date: "2024-02-14 15:00:06",
        tags: data?.tag_name || data
      }
    ])
  };


//seraching form input filed
    const [searchValue, setSearchValue] = useState('');
    const [filteredResult, setFilteredResult] = useState([])
    const [records, setRecords] = useState([
        {
            type: "A",
            name: "ftp",
            priority: "0",
            content: "ip",
            TTL: "1800"
        },
    ]);
    const handleChange = (e) => {
        const value = e.target.value.toUpperCase();
        setSearchValue(value);
        const searchResult = records.filter(item => item.type.includes(value));
        setFilteredResult(searchResult);
        if (value === "") {
            setFilteredResult(records)
        }
    }

    useEffect(() => {
        setFilteredResult(records);
    }, [records])



//dropdown

"use client"

import { ArrowDownIcon } from "@/assets/icons";
import { useRef, useState } from "react";
import { HandleOutsideClickEvent } from "./HandleOutsideClick";

const CustomDropdown = ({ options, setSelectedOption, selectedOption, dropdownFiled = "", childClass = "", label = "", optionClass = "", Icon = false, defaultLabel }) => {
    const [isOpen, setIsOpen] = useState(false);
    const subButtonRef = useRef(null);
    // const [visibleMenu, setVisibleMenu] = useState(false);
    HandleOutsideClickEvent(subButtonRef, setIsOpen);

    const handleToggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleSelectOption = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
    };

    return (
        <div className={`relative`}>
            <div onClick={handleToggleDropdown} className={`${dropdownFiled} text-base leading-[22px] !font-normal px-4 py-3 flex items-center  justify-between border  border-[#DFDFDF] rounded-[4px] cursor-pointer text-secondary `}>
                <button>{selectedOption?.name || <p className={`${defaultLabel}`}>{label}</p>}</button>
                <span className={isOpen ? 'rotate-180 transition-all duration-300' : 'rotate-0 transition-all duration-300'}>
                    {
                        Icon ? <span>{Icon}</span> : <ArrowDownIcon />
                    }
                </span>
            </div>
            {isOpen && (
                <ul ref={subButtonRef} id='custom-dropdown-scroll' className={`z-[999999999] ${childClass} absolute bg-white  w-full max-h-[322px] overflow-y-auto custom-dropdown-shadow  `}>
                    {options?.map((option) => (
                        <li className={`text-sm leading-[18px] text-secondary px-[16px] py-[14px] hover:text-[#F88D43] hover:bg-[#F8F0EB] cursor-pointer hover:font-[500] ${optionClass}`} key={option?.id} onClick={() => handleSelectOption(option)}>
                            {option?.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CustomDropdown;


//table

//image dropdown
//serach
//swipper

//breadcumb
//date input filed
"use client"
import { FilterAddIcon, FilterIcon, InputFilterIcon, InputSearchIcon, RightArrowIcon, SearchIcon } from '@/assets/icons';
import React, { useState } from 'react'
import Input from './Input';
import SmallButton from './SmallButton';
import CustomDropdown from './CustomDropdown';
import { optionsData } from '@/lib/OptionData';

const Breadcrumb = ({ data, searching = false }) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [clicked, setClicked] = useState("")
    console.log(selectedOption)
    return (
        <div className=' bg-white px-[16px] breadcrumb-shadow'>
            <div className='flex py-[14px] border-b-[0.5px] border-[#DFDFDF]'>
                {
                    data?.map((item, index) => (
                        <div key={index} className={`flex gap-[6px] items-center ${index === data.length - 1 ? 'text-secondary' : 'text-shade'}`}>
                            <span className='text-sm leading-5'>{item}</span>
                            {index !== data.length - 1 && <RightArrowIcon />}
                        </div>
                    ))
                }
            </div>
            <div className='py-[18px] flex justify-between'>
                <div>
                    <p className='text-base leading-[21px] text-secondary font-medium'>{data[data.length - 1]}</p>
                    <p className='mt-1.5 text-gray400 text-sm leading-[18px] '>Manage your {data[data.length - 2]}</p>
                </div>
                {
                    searching &&
                    <div className='flex gap-4'>
                        <Input icon={<SearchIcon />} placeholder="Search..." inpClass="w-[248px] pl-[47px] py-[10px] placeholder:text-shade placeholder:text-base" iconClass='top-[11px] left-[12px]' />
                        <div onClick={() => setClicked(!clicked)}><SmallButton clicked={clicked} clickedIcon={<InputFilterIcon />} icon={<FilterAddIcon />} text='Filter' btnClass="w-[109px] h-[46px] gap-1" textClass='font-semibold text-shade' /></div>
                    </div>
                }
            </div>

            {/* filter  field */}
            {
                clicked &&
                <div className='transition-all duration-500 pb-[31px] grid grid-cols-3 gap-[21px] w-full'>
                    <Input placeholder='Supplier Name' inpClass="px-4 py-3 leading-[20px]" />
                    <Input placeholder='Phone Number' inpClass="px-4 py-3 leading-[20px]" />
                    <CustomDropdown options={optionsData} label='Status' selectedOption={selectedOption} setSelectedOption={setSelectedOption} dropdownFiled='!h-[46px]' />
                    <CustomDropdown options={optionsData} label='City' selectedOption={selectedOption} setSelectedOption={setSelectedOption} dropdownFiled='!h-[46px]' />
                    <SmallButton text='Search' icon={<InputSearchIcon />} btnClass="!text-white font-semibold bg-orange500 !border-none !gap-1" />
                </div>
            }
        </div>
    )
}

export default Breadcrumb;


//handle outside click
"use client"
const { useEffect } = require("react");

export const HandleOutsideClickEvent = (subButtonRef, setIsMenuVisible) => {
    useEffect(() => {
        const handleClickOutside = (event) => {
          if (
            subButtonRef.current &&
            !subButtonRef.current.contains(event.target)
          ) {
            setIsMenuVisible(false);
          }
        };
    
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, [subButtonRef, setIsMenuVisible]);
}

//sotck high low icon	

swipper

serch functionality

=>Swipper
=> Filter products
=> Stock Summary Filter
=>card bg
=> Breadcumb msg

transiton on state change

filter icon issue	

input value using custom inp

modal
handle outside click code
searching fyc dropdown

dynamic value get dynamic click
