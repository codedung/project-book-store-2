import { Book, BookDetail } from "../models/book.model";
import { Pagination } from "../models/pagination.model";
import { httpClient, requestHandler } from "./http";

interface FetchBooksParams {
  category_id?: number;
  news?: boolean;
  currentPage?: number;
  limit: number;
}

interface FetchBooksResponse {
  books: Book[];
  pagination: Pagination;
}

export const fetchBooks = async (params: FetchBooksParams) => {
  const response = await httpClient.get<FetchBooksResponse>("/books", {
    params: params
  });

  try {
    return response.data;
  } catch (err) {
    return {
      books: [],
      pagination: {
        totalCount: 0,
        currentPage: 1
      }
    };
  }
};

export const fetchBook = async (bookId: string | undefined) => {
  const response = await httpClient.get<BookDetail | null>(`/books/${bookId}`);

  console.log(response.data);

  return response.data;
};

export const likeBook = async (bookId: number) => {
  const response = await httpClient.post(`/likes/${bookId}`);

  return response.data;
};

export const unlikeBook = async (bookId: number) => {
  const response = await httpClient.delete(`/likes/${bookId}`);

  return response.data;
};

export const fetchBestBooks = async () => {
  return await requestHandler<Book[]>("get", "/books/best");
};
