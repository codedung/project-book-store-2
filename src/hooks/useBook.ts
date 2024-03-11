import { useEffect, useState } from "react";
import {
  BookDetail,
  BookReviewItem,
  BookReviewWrite
} from "../models/book.model";
import { fetchBook, likeBook, unlikeBook } from "../api/books.api";
import { useAuthStore } from "../store/authStore";
import { useAlert } from "./useAlert";
import { addCart } from "../api/cart.api";
import { addBookReview, fetchBookReview } from "@/api/review.api";
import { useToast } from "./useToast";

export const useBook = (bookId: string | undefined) => {
  const [book, setBook] = useState<null | BookDetail>(null);
  const [cartAdded, setCartAdded] = useState<boolean>(false);
  const [reviews, setReviews] = useState<BookReviewItem[]>([]);
  const { isLoggedIn } = useAuthStore();
  const { showAlert } = useAlert();

  const { showToast } = useToast();
  const likeToggle = () => {
    if (!isLoggedIn) {
      showAlert("로그인이 필요합니다.");
      return;
    }

    if (!book) return;
    if (book.liked) {
      unlikeBook(book.idx).then(() => {
        setBook({
          ...book,
          liked: 0,
          likes: book.likes - 1
        });
        showToast("좋아요가 취소 되었습니다.");
      });
    } else {
      likeBook(book.idx).then(() => {
        setBook({
          ...book,
          liked: 1,
          likes: book.likes + 1
        });
        showToast("좋아요가 성공했습니다.");
      });
    }
  };

  const addToCart = (quantity: number) => {
    if (!book) return;
    addCart({
      bookId: book.idx,
      count: quantity
    }).then(() => {
      showAlert("장바구니에 추가 되었습니다.");
      setCartAdded(true);
      setTimeout(() => {
        setCartAdded(false);
      }, 3000);
    });
  };
  useEffect(() => {
    if (!bookId) return;
    fetchBook(bookId).then((book) => {
      setBook(book);
    });
    fetchBookReview(bookId).then((review) => {
      setReviews(review);
    });
  }, [bookId]);

  const addReview = (data: BookReviewWrite) => {
    if (!book) return;

    addBookReview(book.idx.toString(), data).then((res) => {
      // fetchBookReview(book.idx.toString()).then((review) => {
      //   setReviews(review);
      // });
      showAlert(res?.msg);
    });
  };

  return { book, likeToggle, addToCart, cartAdded, reviews, addReview };
};
