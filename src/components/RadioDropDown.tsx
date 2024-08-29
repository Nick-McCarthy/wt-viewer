import React from 'react';
import { RadioDropDownProps } from '../types';
import ChevronDownIcon from './ui/icons/ChevronDownIcon';
import ChevronUpIcon from './ui/icons/ChevronUpIcon';

const RadioDropDown: React.FC<RadioDropDownProps> = ({handleOptionChange, handleRadioDisplay, selectedOption, radioDisplay}) => {
  return (
    <div className='flex flex-col w-40 justify-center relative'>
        <button className='flex p-2 gap-2 rounded-t-md bg-gray-900 text-white w-full justify-center' type="button" onClick={handleRadioDisplay}> 
          Sort By {radioDisplay === false ? <ChevronDownIcon /> : <ChevronUpIcon />}
        </button>
        <div className={radioDisplay === false ? 'hidden' : 'absolute bg-gray-900 text-white pb-2 rounded-b-md z-10 top-full w-full'}>
          <label className='flex px-2 items-center gap-2'>
            <input
              type="radio"
              value="a-z"
              checked={selectedOption === 'a-z'}
              onChange={handleOptionChange}
            />
            a-z
          </label>
          <label className='flex px-2 items-center gap-2'>
            <input
              type="radio"
              value="views"
              checked={selectedOption === 'views'}
              onChange={handleOptionChange}
            />
            views
          </label>
          <label className='flex px-2 items-center gap-2'>
            <input
              type="radio"
              value="updated_at"
              checked={selectedOption === 'updated_at'}
              onChange={handleOptionChange}
            />
            updated_at
          </label>
        </div>
    </div>
  );
};

export default RadioDropDown;
