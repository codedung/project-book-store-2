import Title from "@/components/common/Title";
import Banner from "@/components/common/banner/Banner";
import MainBest from "@/components/home/MainBest";
import MainNewBooks from "@/components/home/MainNewBooks";
import MainReview from "@/components/home/MainReview";
import { useMain } from "@/hooks/useMain";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import styled from "styled-components";

const Home: React.FC = () => {
  const { reviews, newBooks, bestBooks, banners } = useMain();
  const { isMobile } = useMediaQuery();
  return (
    <HomeStyle>
      {/* 배너 */}
      <Banner banners={banners} />
      {/* 셀러 */}
      <section className="section">
        <Title size="large">베스트 셀러</Title>
        <MainBest books={bestBooks} />
      </section>
      {/* 신간 */}
      <section className="section">
        <Title size="large">도서 신간</Title>
        <MainNewBooks books={newBooks} />
      </section>
      <section className="section">
        <Title size="large">리뷰</Title>
        <MainReview reviews={reviews} />
      </section>
    </HomeStyle>
  );
};

const HomeStyle = styled.div`
  .section {
    display: flex;
    flex-flow: column;
    gap: 24px;
    margin-bottom: 24px;
  }
`;

export default Home;
