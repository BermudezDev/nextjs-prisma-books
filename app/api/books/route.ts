import cloudinary from '@/lib/cloudinary'
import prismadb from '@/lib/prismadb'
import axios from 'axios'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const books = await prismadb.book.findMany({
      include: {
        image: true,
        author: true,
      },
    })
    return NextResponse.json(books)
  } catch (error) {
    return new NextResponse('Error:' + error, { status: 400 })
  }
}
export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { title, description, image, author } = body

    const img = await cloudinary.uploader.upload(image, {
      folder: 'books',
    })
    const publicId = img.public_id
    const url = img.secure_url

    if (!title) {
      return new NextResponse('title is required', { status: 400 })
    }
    if (!description) {
      return new NextResponse('desctiption is required', { status: 400 })
    }
    if (!image) {
      return new NextResponse('image is required', { status: 400 })
    }
    if (!author) {
      return new NextResponse('author is required', { status: 400 })
    }
    const res = await prismadb.book.create({
      data: {
        title,
        description,
        image: {
          create: {
            publicId,
            url,
          },
        },
        author: {
          create: {
            name: author,
          },
        },
      },
    })
    return NextResponse.json(res)
  } catch (error) {
    console.log('[api_books]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}
