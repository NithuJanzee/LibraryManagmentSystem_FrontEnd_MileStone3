import { BookPhoto } from "./BookPhoto"

export interface Book {
  bookId: number;
  bookTitle: string;
  publishDate: string;
  genreName: string;
  authorName: string;
  description?: string;
  averageRating: number;
  totalRatings: number;
  photoUrls: BookPhoto[];
  ratingPercentages: { [key: number]: number };
  comments : comments[]
  isLending:boolean
  isRequested:boolean
  quantity:number

}

export interface comments {
  commentText:String
  createdAt:string
  userFirstName:string
  useRatting:number
}

export interface PostBook{
  title: string;
  publishDate: string;
  quantity: number;
  authorId?: number;
  genreId?: number;
  description?: string;
  photos: File[];
}

export interface Genre{
  genreId:number
  genre:string
}

export interface Author{
  authorID:number
  authorName:string
}

export interface GetBookForEdit{
  bookTitle:string
  publishDate:string
  author:string
  genre:string
  quantity:number
  description:string
}
