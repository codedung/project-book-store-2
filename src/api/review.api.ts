import { BookReviewItem, BookReviewWrite } from "@/models/book.model";
import { requestHandler } from "./http";

export const fetchBookReview = async (bookId: string) => {
  return await requestHandler<BookReviewItem>("get", `/reviews/${bookId}`);
};

interface addBookReviewResponse {
  msg: string;
}
export const addBookReview = async (bookId: string, data: BookReviewWrite) => {
  return await requestHandler<addBookReviewResponse>(
    "post",
    `/reviews/${bookId}`
  );
};

export const fetchReviewAll = async () => {
  return await requestHandler<BookReviewItem[]>("get", "/reviews");
};
