import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useBook } from "../hooks/useBook";
import { getImgSrc } from "../utils/images";
import Title from "../components/common/Title";
import { BookDetail as IBookDetail } from "../models/book.model";
import { formatDate, formatNumber } from "../utils/format";
import { Link } from "react-router-dom";
import EllipsisBox from "../components/common/EllipsisBox";
import LikeBtn from "../components/book/LikeBtn";
import AddToCart from "../components/book/AddToCart";
import BookReview from "@/components/book/BookReview";
import { Tabs, Tab } from "@/components/common/Tabs";
import Modal from "@/components/common/Modal";
import { useState } from "react";

const viewInfoList = [
  {
    label: "카테고리",
    key: "category",
    filter: (book: IBookDetail) => {
      return (
        <Link to={`/books?category_id=${book.categoryId}`}>
          {book.category}
        </Link>
      );
    }
  },
  {
    label: "포맷",
    key: "form"
  },
  {
    label: "ISBN",
    key: "isbn"
  },
  {
    label: "페이지",
    key: "pages"
  },
  {
    label: "출간일",
    key: "pubDate",
    filter: (book: IBookDetail) => {
      return formatDate(book.pubDate);
    }
  },
  {
    label: "가격",
    key: "price",
    filter: (book: IBookDetail) => {
      return `${formatNumber(book.price)}원`;
    }
  }
];

const BookDetail: React.FC = () => {
  const { bookId } = useParams();
  const { book, likeToggle, reviews, addReview } = useBook(bookId);
  const [isImgOpen, setIsImgOpen] = useState<boolean>(false);
  const [isImg, setIsImg] = useState<number | null>(null);

  if (!book) return null;
  return (
    <BookDetailStyle>
      <header className="header">
        <div className="img-wrap">
          {book.img?.map((img, i) => (
            <div className="imgItem" key={i}>
              <img
                src={getImgSrc(img.imagePath)}
                alt=""
                onClick={(e: React.MouseEvent) => {
                  setIsImg(i);
                  setIsImgOpen(true);
                }}
              />
              {isImg === i && (
                <Modal
                  isOpen={isImgOpen}
                  onClose={() => {
                    setIsImgOpen(false);
                  }}
                >
                  <img src={getImgSrc(img.imagePath)} alt="" />
                </Modal>
              )}
            </div>
          ))}
        </div>
        <div className="info">
          <Title size="large" color="text">
            {book.title}
          </Title>
          {viewInfoList.map((item, i) => (
            <dl key={i}>
              <dt>{item.label}</dt>
              <dd>
                {item.filter
                  ? item.filter(book)
                  : book[item.key as keyof IBookDetail]?.toString()}
              </dd>
            </dl>
          ))}
          <p className="summary">{book.summary}</p>
          <div className="like">
            <LikeBtn book={book} onClick={likeToggle} />
          </div>
          <div className="add-cart">
            <AddToCart book={book} />
          </div>
        </div>
      </header>
      <div className="content">
        <Tabs>
          <Tab title="상세설명">
            <Title size="medium">상세설명</Title>
            <EllipsisBox linelimit={4}>{book.detail}</EllipsisBox>
          </Tab>
          <Tab title="목차">
            <Title size="medium">목차</Title>
            <p className="index">{book.contents}</p>
          </Tab>
          <Tab title="리뷰">
            <Title size="medium">리뷰</Title>
            <BookReview reviews={reviews} onAdd={addReview} />
          </Tab>
        </Tabs>
      </div>
    </BookDetailStyle>
  );
};

const BookDetailStyle = styled.div`
  .header {
    display: flex;
    align-items: start;
    gap: 24px;
    padding-top: 24px;
  }

  .img {
    flex: 1;
    img {
      width: 100%;
      height: auto;
    }
  }

  .info {
    flex: 1;
    display: flex;
    flex-flow: column;
    gap: 12px;

    dl {
      display: flex;
      margin: 0;
      dt {
        width: 80px;
        color: ${({ theme }) => theme.color.secondary};
      }
      a {
        color: ${({ theme }) => theme.color.primary};
        text-decoration: none;
      }
    }
  }

  .content {
    margin-top: 24px;
    .detail {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 4;
      -webkit-box-orient: vertical;
    }
  }
`;

export default BookDetail;
