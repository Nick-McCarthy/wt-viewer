//import { Input } from "@/components/ui/input"
import  SearchIcon from './ui/icons/SearchIcon'

export default function SearchBar() {
  return (
    <div className="flex items-center justify-center h-[75vh]">
      <div className="relative w-2/5">
        <input
          type="search"
          placeholder="Search..."
          className="block w-full p-4 pr-10 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <SearchIcon />
        </div>
      </div>
    </div>
  )
}


