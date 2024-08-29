import React from 'react';
import { ChapterProps } from '@/types';

const ChapterView: React.FC<ChapterProps> = ({ chapterProps, currentPage}) => {  

  return (
    <ul className='flex flex-col w-full md:w-3/6  justify-center items-center'>
      {chapterProps.map((image, index) => (
        <li key={index} className=''>
            <img 
            src={image.image_path} 
            alt={`Chapter ${image.chapter_number} Image ${image.image_ordering}`} 
            className=' w-full h-full object-contain' 
            loading={index === 0 ? "eager" : "lazy"}
            />
        </li>
      ))}
    </ul>
  );
}

export default ChapterView;