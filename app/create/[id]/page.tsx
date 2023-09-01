'use client'
import { useBooks } from '@/context/BooksContext'
import { useEffect } from 'react'
import CreateForm from '../components/CreateForm'

function Update({ params }: { params: { id: string } }) {
  const { getBook } = useBooks()
  useEffect(() => {
    getBook(params.id)
  }, [])
  return (
    <div>
      <CreateForm id={params.id} />
    </div>
  )
}

export default Update
