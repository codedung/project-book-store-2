// 도서 전체 목록 조회에 사용되는 타입
export interface Book {
  idx: number;
  title: string;
  categoryId: number;
  category?: string;
  mainImage?: string;
  summary: string;
  author: string;
  price: number;
  pubDate: string;
  likes: number;
}

//도서 개별 조회에 사용되는 타입인데 전체목록껄 상속받아
export interface BookDetail extends Book {
  form: string;
  isbn: string;
  detail: string;
  pages: number;
  contents: string;
  liked: number;
  img?: BookImage[];
}

export interface BookImage {
  imagePath: string;
  main: string;
}

export interface BookReviewItem {
  idx: number;
  userName: string;
  content: string;
  createAt: string;
  score: number;
}

export type BookReviewWrite = Pick<BookReviewItem, "content" | "score">;
