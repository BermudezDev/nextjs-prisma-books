'use client'
import { IBook, BookUpdate, CurrentBook } from '@/interfaces/Book'
import { Book } from '@prisma/client'
import { useContext, createContext, useState } from 'react'
import axios from 'axios'
export const BooksContext = createContext<{
  bookList: any[]
  currentBook: CurrentBook
  getBooks: () => Promise<void>
  getBook: (id: string) => Promise<void>
  postBook: (book: IBook) => Promise<void>
  deleteBook: (id: string) => void
  updateBook: (id: string, book: BookUpdate) => void
}>({
  bookList: [],
  currentBook: {},
  getBooks: async () => {},
  getBook: async (id: string) => {},
  postBook: async (book: IBook) => {},
  deleteBook: async (id: string) => {},
  updateBook: async (id: string, book: BookUpdate) => {},
})

export const useBooks = () => {
  const context = useContext(BooksContext)
  if (!context) {
    throw new Error('useBooks must be used within a NotesProvider')
  }
  return context
}

export const BooksProvider = ({ children }: { children: React.ReactNode }) => {
  const [bookList, setBookList] = useState<any[]>([])
  const [currentBook, setCurrentBook] = useState<CurrentBook>({})
  const getBooks = async () => {
    const response = await axios.get('/api/books/')
    const books = response.data
    setBookList(books)
  }

  const getBook = async (id: string) => {
    const response = await axios.get('/api/books/' + id)
    const book = response.data
    setCurrentBook(book)
  }
  const postBook = async (book: IBook) => {
    console.log(book)
    const response = await axios.post('/api/books/', book)
    const newBook = response.data
    setBookList([...bookList, newBook])
  }
  const deleteBook = async (id: string) => {
    const response = await axios.delete('/api/books/' + id)
    const deletedBook = response.data
  }
  const updateBook = async (id: string, book: BookUpdate) => {
    const response = await axios.put('/api/books/' + id, book)
    const updatedBook = response.data
    setBookList(bookList.map((book) => (book.id === id ? updateBook : book)))
  }
  return (
    <BooksContext.Provider
      value={{
        bookList,
        currentBook,
        getBooks,
        getBook,
        postBook,
        deleteBook,
        updateBook,
      }}
    >
      {children}
    </BooksContext.Provider>
  )
}
