'use client'

import { useBooks } from '@/context/BooksContext'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
export default function Home() {
  const navigate = useRouter()
  const { bookList, getBooks, updateBook, deleteBook } = useBooks()
  useEffect(() => {
    getBooks()
  }, [])

  return (
    <main className="flex min-h-screen p-4">
      <section className="flex h-full w-[70%]">
        <div className="flex flex-wrap gap-2">
          {bookList.map((book, index) => (
            <div
              key={index}
              className="flex max-h-[380px] max-w-[180px] flex-col flex-wrap break-words rounded-sm bg-slate-800 p-2"
            >
              <div className="flex h-[230px] object-cover">
                <Image
                  src={book.image.url}
                  width={194}
                  height={291}
                  alt={book.title}
                ></Image>
              </div>
              <div className="flex grow flex-col justify-between">
                <h3 className="text-center font-bold uppercase text-white">
                  {book.title}
                </h3>
                <p className="text-slate-400">{book.description}</p>
                <h2 className="text-right font-bold text-white">
                  {book.author.name}
                </h2>
              </div>
              <div className="mt-1 flex justify-between border-t border-orange-400 text-slate-700">
                <p onClick={() => navigate.push('/create/' + book.id)}>edit</p>
                <p onClick={() => deleteBook(book.id)}>delete</p>
                <p>fav</p>
              </div>
            </div>
          ))}
          <div
            className="flex h-[380px] w-[180px] cursor-pointer items-center justify-center bg-slate-800 hover:bg-slate-700"
            onClick={() => navigate.push('/create')}
          >
            <p className="text-8xl font-bold text-white">+</p>
          </div>
        </div>
      </section>
      <div className="flex min-h-screen w-[30%] bg-slate-800">a</div>
    </main>
  )
}
