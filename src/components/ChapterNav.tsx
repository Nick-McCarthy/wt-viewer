import React from 'react'
import DoubleChevronLeft from './ui/icons/DoubleChevronLeftIcon'
import DoubleChevronRight from './ui/icons/DoubleChevronRightIcon'
import Home from './ui/icons/HomeIcon'
import { Button } from './ui/Button'
import { ChapterNavProps } from '@/types'

const ChapterNav: React.FC<ChapterNavProps> = ({ HHP, HNP, HPP }) => {


  return (
    <div className="flex space-x-4 gap-4 py-5">
      <Button variant='chapterNav' size='sm' onClick={() => HPP()} > <DoubleChevronLeft /> </Button>
      <Button variant='chapterNav' size='sm' onClick={() => HHP()} > <Home /> </Button>
      <Button variant='chapterNav' size='sm' onClick={() => HNP()} > <DoubleChevronRight /> </Button> 
    </div>
  )
}

export default ChapterNav