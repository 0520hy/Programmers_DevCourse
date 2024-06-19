import { useEffect, useState } from "react"
import { BookDetail, BookReviewItem, BookReviewItemWrite } from "../models/book.model";
import { fetchBook, likeBook, unlikeBook } from "../api/book.api";
import { useAuthStore } from "../store/authStore";
import { useAlert } from "./useAlert";
import { addCart } from "../api/carts.api";
import { addBookReview, fetchBookReview } from "@/api/review.api";

export const useBook = (bookId : string | undefined) => {
    const [book, setBook] = useState<BookDetail | null>(null);
    const [cartAdded, setCartAdded] = useState(false);
    const [reviews, setReviews] = useState<BookReviewItem[]>([])

    const {isloggedIn} = useAuthStore();
    const {showAlert} = useAlert();

    const likeToggle = () => {
        // 권한 확인
        if(!isloggedIn){
            showAlert("로그인이 필요합니다.")
            return;
        }

        if(!book) return;

        if(book.liked) {
            unlikeBook(book.id).then(() => {
                setBook({
                    ...book,
                    liked: false,
                    likes: book.likes - 1,
                })
            })
        } else {
            likeBook(book.id).then(() => {
                setBook({
                    ...book,
                    liked: true,
                    likes: book.likes + 1,
                })
            })
        }
    }

    
    const addToCart = (quantity:number) => {

        if(!book) return;

        addCart({
            book_id: book.id,
            quantity: quantity,
        }).then(() => {
            setCartAdded(true)
            // showAlert("장바구니에 추가되었습니다.")
            setTimeout(() => {
                setCartAdded(false)
            },3000)
        })
    }

    useEffect(() => {

        if (!bookId) return; // bookId가 없을 때 불필요한 API 호출 방지

        fetchBook(bookId).then((book) => {
            setBook(book)
        })

        fetchBookReview(bookId).then((reviews) => {
            setReviews(reviews);
        })
    }, [bookId])

    const addReview = (data: BookReviewItemWrite) => {
        if (!book) return;

        addBookReview(book.id.toString(), data).then((res) => {
            setReviews(reviews)
        })
    }


    return { book, likeToggle, addToCart, cartAdded, reviews, addReview }
}