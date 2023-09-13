export interface IBook {
  title: string
  description: string
  image: string
  imageId?: string
  author: string
  authorId?: string
}

export interface CurrentBook {
  title: string
  description: string
  image: {
    id: string
    url: string
    publicId: string
  }
  imageId: string
  author: {
    id: string
    name: string
  }
  authorId?: string
}

export interface BookUpdate {
  title?: string
  description?: string
  image?: string
  imageId?: string
  author?: string
  authorId?: string
}
