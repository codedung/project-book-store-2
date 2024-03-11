import { Book, BookReviewItem } from "@/models/book.model";
import { http, HttpResponse } from "msw";
import { fakerKO as faker } from "@faker-js/faker";

const bestBooksData: Book[] = Array.from({ length: 10 }).map((item, index) => ({
  idx: index,
  title: faker.lorem.sentence(),
  mainImage: faker.helpers.rangeToNumber({ min: 100, max: 200 }).toString(),
  categoryId: faker.helpers.rangeToNumber({ min: 0, max: 2 }),
  summary: faker.lorem.paragraph(),
  author: faker.person.firstName(),
  price: faker.helpers.rangeToNumber({ min: 10000, max: 50000 }),
  likes: faker.helpers.rangeToNumber({ min: 0, max: 100 }),
  pubDate: faker.date.past().toISOString()
}));

export const bestBooks = http.get("http://localhost:8080/books/best", () => {
  return HttpResponse.json(bestBooksData, {
    status: 200
  });
});
