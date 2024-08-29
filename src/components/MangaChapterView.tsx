import React from 'react';
import { ChapterProps } from '@/types';

const ChapterView: React.FC<ChapterProps> = ({ chapterProps, currentPage}) => {  

  return (
    <ul className=''>
      {chapterProps.map((image, index) => (
        <li key={index} className={currentPage == image.image_ordering ? 'aspect-[3/4] w-90 mx-3 overflow-hidden object-contain' : 'hidden'}>
            <img src={image.image_path} alt={`Chapter ${image.chapter_number} Image ${image.image_ordering}`} className='w-fit' />
        </li>
      ))}
    </ul>
  );
}

export default ChapterView;