import { BookPhoto } from "./BookPhoto"

export interface Book {
    bookId: number
    bookTitle: string
    publishDate: Date
    genreName: string
    authorName: string
    averageRating: number
    photoUrls: BookPhoto[]
  }
  