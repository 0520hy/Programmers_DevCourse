import React from 'react'
import styled from 'styled-components';
import BookItem from './BookItem';
import { Book } from '../../models/book.model';

const dummyBook: Book = {
    id: 1,
    title: "Dummy title",
    img: 5,
    category_id: 1,
    form: "paper",
    isbn: "isbn",
    summary: "Dummy",
    detail: "Dummy Book",
    author: "author",
    pages: 200,
    contents: "Dummy Contents",
    price: 2000,
    pub_date: "2024-06-01",
    likes: 1
}

function BooksList() {
  return (
    <BooksListStyle>
      <BookItem book={dummyBook}/>
    </BooksListStyle>
  )
}

const BooksListStyle = styled.div``

export default BooksList;
