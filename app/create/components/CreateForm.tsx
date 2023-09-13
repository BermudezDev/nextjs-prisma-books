'use client'

import { useBooks } from '@/context/BooksContext'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { BookUpdate } from '@/interfaces/Book'
export default function CreateForm({ id }: { id?: string }) {
  const { postBook, updateBook, currentBook } = useBooks()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState('')
  const [author, setAuthor] = useState('')
  const navigate = useRouter()

  useEffect(() => {
    if (currentBook) {
      setTitle(currentBook.title)
      setDescription(currentBook.description)
      setAuthor(currentBook.author?.name)
    }
    console.log(author)
  }, [currentBook])

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center p-24">
      <div
        className="absolute left-2 top-2 cursor-pointer rounded-sm bg-orange-400 px-2 py-1"
        onClick={() => navigate.push('/')}
      >
        <p className="text-xl text-white">{'< Go Back'}</p>
      </div>
      <div className="m-4 flex bg-slate-800 p-4">
        <form
          onSubmit={async (e) => {
            e.preventDefault()
            if (id) {
              const res = await updateBook(id, {
                title,
                description,
                image,
                imageId: currentBook.imageId,
                author,
                authorId: currentBook.authorId,
              })
            } else {
              const res = await postBook({
                title,
                description,
                image,
                author,
              })
            }
            navigate.push('/')
          }}
        >
          <div className="flex flex-col py-2 text-white">
            <label>Title:</label>
            <input
              type="text"
              name="title"
              defaultValue={currentBook?.title}
              placeholder="title"
              className="px-1 text-slate-800 focus:outline-none"
              onChange={(e) => {
                setTitle(e.target.value)
              }}
            />
          </div>
          <div className="flex flex-col py-2 text-white">
            <label>Description:</label>
            <textarea
              defaultValue={currentBook.description}
              name="description"
              placeholder="content"
              className="resize-none px-1 text-slate-800 focus:outline-none"
              onChange={(e) => {
                setDescription(e.target.value)
              }}
            />
          </div>
          <div className="flex flex-col py-2 text-white">
            <label>Author:</label>
            <input
              defaultValue={currentBook?.author?.name}
              type="text"
              name="author"
              placeholder="author"
              className="px-1 text-slate-800 focus:outline-none"
              onChange={(e) => {
                setAuthor(e.target.value)
              }}
            />
          </div>
          <div className="py-2 text-white">
            <input
              type="file"
              name="image"
              defaultValue={currentBook.image?.url}
              onChange={(e) => {
                if (e.target.files != null) {
                  const img = e.target.files[0]
                  const reader = new FileReader()
                  reader.readAsDataURL(img)
                  reader.onloadend = () => {
                    const res = reader.result
                    if (typeof res === 'string') {
                      setImage(res)
                    } else {
                      setImage('')
                    }
                  }
                } else {
                  setImage('')
                }
              }}
            />
          </div>
          <div className="flex w-full justify-center py-2">
            <button
              type="submit"
              className="rounded-sm bg-orange-400 px-2 py-1 font-bold text-white"
            >
              {!id ? 'Create' : 'Update'}
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}
