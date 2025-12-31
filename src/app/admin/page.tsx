"use client"
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

export default function AdminPage() {
  const router = useRouter()  
  
  useEffect(() => {
    router.push("/admin/verification")
  }, [])
  return (
    <div>AdminPage</div>
  )
}
