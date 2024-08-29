"use client"
import { useState } from "react"
import { Button } from "./ui/Button"
import { GenreDropDownProps } from "@/types"

const GenreDropDown: React.FC<GenreDropDownProps> = ({ setSelectedFilter, genreList }) =>{
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="w-full">
      <div className="flex items-center justify-center py-4 px-8 border-b border-slate-500 mx-6">
        <Button variant='genreMain' size='wide' onClick={() => setIsOpen(!isOpen)}>Genre</Button>
      </div>
      {isOpen && (
        <div className="grid grid-cols-2 bg-slate-500 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 mx-6 rounded-b-md">
          {genreList.map((item, index) => (
          <Button key={index} variant='genreOption' size='wide' onClick={() => setSelectedFilter(item.genre)}>{item.genre}</Button>
        ))}
        </div>
      )}
    </div>
  )
}

export default GenreDropDown;