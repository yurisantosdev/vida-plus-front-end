import React, { ReactNode } from 'react'

interface SubtitleInterface {
  icon: ReactNode
  title: string
}

export default function Subtitle({ icon, title }: SubtitleInterface) {
  return (
    <div className="flex justify-start items-center gap-2 mb-2">
      {icon}
      <h2 className="text-black font-semibold">{title}</h2>
    </div>
  )
}
