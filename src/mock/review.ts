import { BookReviewItem } from "@/models/book.model";
import { http, HttpResponse } from "msw";
import { fakerKO as faker } from "@faker-js/faker";

// const mockReviewData: BookReviewItem[] = [
//   {
//     idx: 1,
//     userName: "둥둥",
//     content: "최고에요",
//     createAt: "2024-01-01",
//     score: 5
//   },
//   {
//     idx: 2,
//     userName: "용용",
//     content: "진짜 재밌어요",
//     createAt: "2024-01-02",
//     score: 4
//   }
// ];

const mockReviewData: BookReviewItem[] = Array.from({ length: 8 }).map(
  (_, index) => ({
    idx: index,
    userName: `${faker.person.lastName()}${faker.person.firstName()}`,
    content: faker.lorem.paragraph(),
    createAt: faker.date.past().toISOString(),
    score: faker.helpers.rangeToNumber({ min: 1, max: 5 })
  })
);

export const reviewsById = http.get(
  "http://localhost:8080/reviews/:bookId",
  () => {
    return HttpResponse.json(mockReviewData, { status: 200 });
  }
);

export const addReview = http.post(
  "http://localhost:8080/reviews/:bookId",
  () => {
    return HttpResponse.json(
      {
        msg: "리뷰가 등록되었습니다."
      },
      {
        status: 200
      }
    );
  }
);

export const reviewForMain = http.get("http://localhost:8080/reviews", () => {
  return HttpResponse.json(mockReviewData, { status: 200 });
});
