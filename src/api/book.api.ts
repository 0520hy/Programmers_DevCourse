import { deflate } from "zlib";
import { Book } from "../models/book.model";
import { Pagination } from "../models/pagination.model";
import { httpClient } from "./http";

interface FetchBooksParams {
    category_id? : number;
    news? :boolean;
    currentPage?: number;
    limit: number;
}

interface FetchBooksResponse {
    books: Book[];
    pagination: Pagination;
}

export const fetchBooks = async (params: FetchBooksParams ) => {
    try {
        const response = await httpClient
        .get<FetchBooksResponse>("/books", {
            params: params,
        })
        return response.data;
    } catch (error) { // 검색 결과가 없을 때 빈 데이터가 아닌 404 에러 발생
        return {
            books: [],
            pagination: {
                totalCount: 0,
                currentPage: 1.
            }
        }
    }
}