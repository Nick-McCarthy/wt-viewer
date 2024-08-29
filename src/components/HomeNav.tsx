'use client'
import Link from "next/link"
import BookIcon from "./ui/icons/BookIcon"
import AuthButton from "./ui/AuthButton"

export default function HomeNav() {

  return (
    <header className="w-full h-20 bg-gray-900 text-white py-4 px-6 md:px-8 lg:px-10">
      <nav className="flex justify-between items-center">
        <Link href="/" className="text-lg font-bold" prefetch={false}>
          <BookIcon />
        </Link>
        <div className="flex gap-6 md:gap-8 lg:gap-10">
          <Link href="/manga" className="text-sm font-medium hover:text-gray-300 transition-colors" prefetch={false}>
            Mangas
          </Link>
          <Link href="/webtoon" className="text-sm font-medium hover:text-gray-300 transition-colors" prefetch={false}>
            Webtoon
          </Link>
          <Link href="/comic" className="text-sm font-medium hover:text-gray-300 transition-colors" prefetch={false}>
            Comic
          </Link>
          <Link href="/tv-show" className="text-sm font-medium hover:text-gray-300 transition-colors" prefetch={false}>
            Tv-Show
          </Link>
          <Link href="/movie" className="text-sm font-medium hover:text-gray-300 transition-colors" prefetch={false}>
            Movie
          </Link>
          <AuthButton />
        </div>
      </nav>
    </header>
  )
}

