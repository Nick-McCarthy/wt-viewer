'use client'
import React from 'react'
import { IpDetailsProps } from '../types'

const IpDetailsCard: React.FC<IpDetailsProps> = ({ content }) => {

  return (
    <div className="w-full max-w-[90vw] md:max-w-[80vw] lg:max-w-[60vw] mx-auto p-4 md:p-6 lg:p-8 ">
      <div className="bg-card rounded-lg overflow-hidden shadow-lg grid md:grid-cols-3 bg-slate-500 p-4">
        <div className="md:col-span-1">
          <img
            src={content.thumbnail_address}
            width={300}
            height={400}
            className="w-full h-full object-cover aspect-portrait rounded-lg"
          />
        </div>
        <div className="md:col-span-2 p-4 md:p-6 lg:p-8 flex flex-col">
          <h2 className="text-2xl md:text-3xl font-bold text-card-foreground mb-2 text-white">
            {content.ip_title}
          </h2>
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed text-white">
            {content.ip_description}
          </p>
        </div>
      </div>
    </div>

  )
}

export default IpDetailsCard

/*



*/