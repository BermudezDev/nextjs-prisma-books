'use client'

import { useBooks } from '@/context/BooksContext'
import { useState, useEffect } from 'react'
import { VscEdit, VscTrash, VscHeart } from 'react-icons/vsc'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
export default function Home() {
  const navigate = useRouter()
  const { bookList, getBooks, updateBook, deleteBook } = useBooks()
  useEffect(() => {
    getBooks()
  }, [bookList.length])

  return (
    <main className="flex min-h-screen p-4">
      <section className="flex h-full w-[70%]">
        <div className="flex flex-wrap gap-2">
          {bookList.map((book, index) => (
            <div
              key={index}
              className="flex max-h-[400px] max-w-[200px] flex-col flex-wrap break-words rounded-sm bg-slate-800 p-2"
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
                <p className="text-sm text-slate-400">{book.description}</p>

                <h2 className="text-center font-bold text-white">
                  {book.author.name}
                </h2>
              </div>
              <div className="flex justify-between border-t border-orange-400 pt-2 text-xl text-slate-700">
                <p
                  className="cursor-pointer hover:text-white"
                  onClick={() => navigate.push('/create/' + book.id)}
                >
                  <VscEdit />
                </p>
                <p
                  className="cursor-pointer hover:text-white"
                  onClick={() => deleteBook(book.id)}
                >
                  <VscTrash />
                </p>
                <p className="cursor-pointer hover:text-white">
                  <VscHeart />
                </p>
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
