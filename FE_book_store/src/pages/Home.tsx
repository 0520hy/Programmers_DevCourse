import Banner from '@/components/common/banner/Banner';
import Title from '@/components/common/Title';
import MainNewBooks from '@/components/main/MainNewBooks';
import MainReview from '@/components/main/MainReview';
import { useMain } from '@/hooks/useMain';
import styled from 'styled-components';

function Home() {
  const { reviews, newBooks, banners } = useMain();
  return (
    <HomeStyle>
      <Banner banners={banners} />
      <section className='section'>
        <Title size='large'>베스트 셀러</Title>
      </section>
      <section className='section'>
        <Title size='large'>신간 안내</Title>
        <MainNewBooks books={newBooks} />
      </section>
      <section className='section'>
        <Title size='large'>리뷰</Title>
        <MainReview reviews={reviews} />
      </section>
    </HomeStyle>
  );
}

const HomeStyle = styled.div``;

export default Home;
