import cloudinary from '@/lib/cloudinary'
import prismadb from '@/lib/prismadb'
import axios from 'axios'
import { NextResponse } from 'next/server'
import { useState } from 'react'

interface Params {
  params: { id: string }
}

export async function GET(req: Request, { params }: Params) {
  const { id } = params
  const book = await prismadb.book.findFirst({
    where: {
      id: id,
    },
    include: {
      image: true,
      author: true,
    },
  })
  if (!book) {
    return new NextResponse('Book not found', { status: 404 })
  }
  return NextResponse.json(book)
}

export async function DELETE(req: Request, { params }: Params) {
  const { id } = params
  const book = await prismadb.book.delete({
    where: {
      id: id,
    },
  })

  if (!book) {
    return new NextResponse('Book not found', { status: 404 })
  }
  return NextResponse.json(book)
}

export async function PUT(req: Request, { params }: Params) {
  const { id } = params
  const body = await req.json()
  const { title, description, imageId, image, author, authorId } = body

  if (image) {
    const { public_id, url } = await cloudinary.uploader.upload(image, {
      folder: 'books',
    })

    const book = await prismadb.book.update({
      where: {
        id: id,
      },
      data: {
        title,
        description,
        image: {
          update: {
            where: {
              id: imageId,
            },
            data: {
              publicId: public_id,
              url,
            },
          },
        },
        author: {
          update: {
            where: {
              id: authorId,
            },
            data: {
              name: author,
            },
          },
        },
      },
    })

    if (!book) {
      return new NextResponse('Book not found', { status: 404 })
    }
    return NextResponse.json(book)
  }
  const book = await prismadb.book.update({
    where: {
      id: id,
    },
    data: {
      title,
      description,
      author: {
        update: {
          where: {
            id: authorId,
          },
          data: {
            name: author,
          },
        },
      },
    },
  })

  if (!book) {
    return new NextResponse('Book not found', { status: 404 })
  }
  return NextResponse.json(book)
}
