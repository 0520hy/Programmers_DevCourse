import { BookReviewItem as IBookReviewItem} from '@/models/book.model';
import styled from 'styled-components';
import BookReviewItem from './BookReviewItem';

interface Props {
    reviews: IBookReviewItem[];
}
function BookReview({reviews} : Props) {
  return (
    <BookReviewStyle>
      {
        reviews.map((review) =>(
            <BookReviewItem review={review}/>
        ))
      }
    </BookReviewStyle>
  )
}

const BookReviewStyle = styled.div`
 display: flex;
 flex-direction: column;
 gap: 16px;
`;

export default BookReview;