import { render } from '@testing-library/react';
import { BookStoreThemeProvider } from '../../context/themeContext';
import BookItem from './BookItem';

const dummyBook = {
  id: 1,
  title: 'Dummy title',
  img: 5,
  category_id: 1,
  form: 'paper',
  isbn: 'isbn',
  summary: 'Dummy',
  detail: 'Dummy Book',
  author: 'author',
  pages: 200,
  contents: 'Dummy Contents',
  price: 2000,
  pub_date: '2024-06-01',
  likes: 1,
};

describe('BookItem', () => {
  it('렌더 여부', () => {
    const { getByText } = render(
      <BookStoreThemeProvider>
        <BookItem book={dummyBook} />
      </BookStoreThemeProvider>,
    );

    expect(getByText(dummyBook.title)).toBeInTheDocument();
    expect(getByText(dummyBook.summary)).toBeInTheDocument();
    expect(getByText(dummyBook.author)).toBeInTheDocument();
    expect(getByText('2,000원')).toBeInTheDocument();
    expect(getByText(dummyBook.likes)).toBeInTheDocument();
    expect(getByText(dummyBook.title)).toHaveAttribute(
      'src',
      `https://picsum.photos/id/${dummyBook.img}/600/600`,
    );
  });
});
