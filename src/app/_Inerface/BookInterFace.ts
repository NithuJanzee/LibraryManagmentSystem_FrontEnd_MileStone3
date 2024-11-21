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
}
