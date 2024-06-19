import { BookReviewItem } from "@/models/book.model";
import { fakerKO as faker } from "@faker-js/faker";
import { http, HttpResponse } from "msw"

const mockReviewData: BookReviewItem[] = Array.from({length: 8}).map((_,index) => ({
    id: index,
    userName: faker.person.firstName(),
    content: faker.lorem.paragraph(),
    created_at: faker.date.past().toISOString(),
    score: faker.helpers.rangeToNumber({min: 1, max: 5})
})) 

export const reviewsById = http.get("http://localhost:9999/reviews/:bookId",() => {
    
    return HttpResponse.json( mockReviewData, {
        status: 200,
    })
})