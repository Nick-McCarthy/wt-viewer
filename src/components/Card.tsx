import React from 'react'
import { CardProps } from '@/types'
import Link from 'next/link'


const Card: React.FC<{ ip: CardProps, contentType: string }> = ({ ip, contentType }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-lg transition-shadow duration-300 dark:bg-gray-950">
      <Link href={`/${contentType}/${ip.ip_title}`} className="block relative h-0 pb-[150%] overflow-hidden" prefetch={false}>
        <img
          src={ip.thumbnail_address}
          alt={ip.ip_title}
          width={300}
          height={400}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </Link>
      <div className="p-4">
        <h3 className="text-lg font-semibold line-clamp-2">{ip.ip_title}</h3>
      </div>
    </div>
  )
}

export default Card

