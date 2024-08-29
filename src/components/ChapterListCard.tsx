import { useState } from 'react'
import React from 'react'
import { ChapterListProps } from '../types'
import Link from 'next/link'
import {Button} from './ui/Button'
import ChevronUpIcon from './ui/icons/ChevronUpIcon'
import ChevronDownIcon from './ui/icons/ChevronDownIcon'

const ChapterListCard: React.FC<ChapterListProps> = ({ chapterList, params }) => {
  
  const [showAll, setShowAll] = useState(false);

  const toggleShowAll = () => setShowAll(!showAll);

  const chaptersToShow = showAll ? chapterList : chapterList.slice(0, 10);

  return (
    <div className='w-full max-w-md mx-auto'>
      <div className='space-y-4'>
        <h1 className='text-2xl font-semibold text-white mb-1'>Chapter List</h1>
        <ul className='space-y-2  rounded-md'>
            {chaptersToShow.map((chapter) => (
                <Link href={`/${params.content_type}/${params.ip_title}/${chapter.chapter_number}`} className='block  rounded-md'>
                  <li key={chapter.chapter_number} className='flex items-center justify-between px-4 py-3 rounded-lg border-b border-b-muted text-lg font-medium text-white bg-slate-500 hover:bg-slate-800 '>
                    Chapter {chapter.chapter_number}
                  </li>
                  </Link>
            ))}
        </ul>
        <Button variant='default' size='wide' onClick={toggleShowAll}>
        {showAll ? <ChevronUpIcon /> : <ChevronDownIcon />}
        </Button>
      </div>
    </div>
  )
}

export default ChapterListCard