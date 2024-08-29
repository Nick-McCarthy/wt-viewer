import React from 'react';
import { LimitDropDownProps } from '../types';
import ChevronDownIcon from './ui/icons/ChevronDownIcon';
import ChevronUpIcon from './ui/icons/ChevronUpIcon';

const RadioDropDown: React.FC<LimitDropDownProps> = ({handleLimitOptionChange, handleLimitDisplay, selectedLimitOption, limitDisplay}) => {
  return (
    <div className='flex flex-col w-40 justify-center relative mx-10'>
        <button className='flex p-2 gap-2 rounded-t-md bg-gray-900 text-white w-full justify-center' type="button" onClick={handleLimitDisplay}> 
          Page Size {limitDisplay === false ? <ChevronDownIcon /> : <ChevronUpIcon />}
        </button>
        <div className={limitDisplay === false ? 'hidden' : 'absolute bg-gray-900 text-white pb-2 rounded-b-md z-10 top-full w-full'}>
          <label className='flex px-2 items-center gap-2'>
            <input
              type="radio"
              value='12'
              checked={selectedLimitOption === 12}
              onChange={handleLimitOptionChange}
            />
            12
          </label>
          <label className='flex px-2 items-center gap-2'>
            <input
              type="radio"
              value="16"
              checked={selectedLimitOption === 16}
              onChange={handleLimitOptionChange}
            />
            16
          </label>
          <label className='flex px-2 items-center gap-2'>
            <input
              type="radio"
              value="20"
              checked={selectedLimitOption === 20}
              onChange={handleLimitOptionChange}
            />
            20
          </label>
        </div>
    </div>
  );
};

export default RadioDropDown;