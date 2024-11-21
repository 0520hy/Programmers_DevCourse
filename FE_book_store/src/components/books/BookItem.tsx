import { ViewMode } from '@/components/books/BooksViewSwitcher';
import { Book } from '@/models/book.model';
import { formatNumber } from '@/utils/format';
import { getImgSrc } from '@/utils/image';
import { FaHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface Props {
  book: Book;
  view?: ViewMode;
}

function BookItem({ book, view }: Props) {
  return (
    <BookItemStyle view={view}>
      <Link to={`/book/${book.id}`}>
        <div className='img'>
          <img src={getImgSrc(book.img)} alt={book.title} />
        </div>
        <div className='content'>
          <p className='title'>{book.title}</p>
          <h2 className='summary'>{book.summary}</h2>
          <p className='author'>{book.author}</p>
          <p className='price'>{formatNumber(book.price)}원</p>
          <div className='likes'>
            <FaHeart />
            <span>{book.likes}</span>
          </div>
        </div>
      </Link>
    </BookItemStyle>
  );
}

const BookItemStyle = styled.div<Pick<Props, 'view'>>`
  a {
    display: flex;
    flex-direction: ${({ view }) => (view === 'grid' ? 'column' : 'row')};
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
    text-shadow: none;
  }

  .img {
    border-radius: ${({ theme }) => theme.borderRadius.default};
    overflow: hidden;
    width: ${({ view }) => (view === 'grid' ? 'auto' : '160px')};
    img {
      max-width: 100%;
    }
  }

  .content {
    padding: 16px;
    position: relative;
    flex: ${({ view }) => (view === 'grid' ? 0 : 1)};

    .title {
      font-size: 1.25rem;
      font-weight: 700;
      margin: 0 0 12px 0;
    }

    .summary {
      font-size: 0.875rem;
      color: ${({ theme }) => theme.color.secondary};
      margin: 0 0 4px 0;
    }

    .author {
      font-size: 0.875rem;
      color: ${({ theme }) => theme.color.secondary};
      margin: 0 0 4px 0;
    }

    .price {
      font-size: 1rem;
      color: ${({ theme }) => theme.color.secondary};
      margin: 0 0 4px 0;
      font-weight: 700;
    }

    .likes {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      font-size: 0.875rem;
      color: ${({ theme }) => theme.color.primary};
      margin: 0 0 4px 0;
      font-weight: 700;
      border: 1px solid ${({ theme }) => theme.color.border};
      border-radius: ${({ theme }) => theme.borderRadius.default};
      padding: 4px 12px;
      position: absolute;
      bottom: 16px;
      right: 16px;

      svg {
        color: ${({ theme }) => theme.color.primary};
      }
    }
  }
`;

export default BookItem;