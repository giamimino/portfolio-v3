import React from 'react'

export default function Tag({ tag}: { tag: string }) {
  return (
    <div className='py-0.5 text-sm bg-dark-02/80 px-2 rounded-full border border-primary-border text-b-9'>{tag}</div>
  )
}
